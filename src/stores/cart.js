import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { storage } from '@/utils/storage'
import { getItemById } from '@/data/menu'

const CART_KEY = 'luosifen_cart'

export const useCartStore = defineStore('cart', () => {
  // 从localStorage恢复购物车数据
  const cartItems = ref(storage.get(CART_KEY) || [])

  // 计算总价
  const totalPrice = computed(() => {
    return cartItems.value.reduce((sum, item) => {
      return sum + item.price * item.quantity
    }, 0)
  })

  // 计算总数量
  const totalCount = computed(() => {
    return cartItems.value.reduce((sum, item) => {
      return sum + item.quantity
    }, 0)
  })

  // 保存到localStorage
  const saveCart = () => {
    storage.set(CART_KEY, cartItems.value)
  }

  // 添加商品到购物车
  const addToCart = (item, quantity = 1) => {
    const existingItem = cartItems.value.find(i => i.id === item.id)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cartItems.value.push({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: quantity
      })
    }

    saveCart()
  }

  // 从购物车移除商品
  const removeFromCart = (itemId) => {
    const index = cartItems.value.findIndex(i => i.id === itemId)
    if (index > -1) {
      cartItems.value.splice(index, 1)
      saveCart()
    }
  }

  // 更新商品数量
  const updateQuantity = (itemId, quantity) => {
    const item = cartItems.value.find(i => i.id === itemId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(itemId)
      } else {
        item.quantity = quantity
        saveCart()
      }
    }
  }

  // 清空购物车
  const clearCart = () => {
    cartItems.value = []
    saveCart()
  }

  // 切换选中状态
  const toggleSelected = (itemId) => {
    const item = cartItems.value.find(i => i.id === itemId)
    if (item) {
      item.selected = !item.selected
      saveCart()
    }
  }

  // 全选/取消全选
  const selectAll = (selected) => {
    cartItems.value.forEach(item => {
      item.selected = selected
    })
    saveCart()
  }

  // 获取选中的商品
  const getSelectedItems = () => {
    return cartItems.value.filter(item => item.selected)
  }

  // 获取选中的商品总价
  const selectedTotalPrice = computed(() => {
    return getSelectedItems().reduce((sum, item) => {
      return sum + item.price * item.quantity
    }, 0)
  })

  return {
    cartItems,
    totalPrice,
    totalCount,
    selectedTotalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleSelected,
    selectAll,
    getSelectedItems
  }
})
