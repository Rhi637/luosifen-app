<template>
  <div class="cart-page">
    <!-- 顶部导航 -->
    <van-nav-bar
      title="购物车"
      :right-text="isEmpty ? '' : '清空'"
      @click-right="clearCart"
      fixed
      placeholder
    />

    <!-- 空购物车 -->
    <van-empty v-if="isEmpty" description="购物车是空的">
      <template #button>
        <van-button type="primary" color="#FF4D00" @click="$router.push('/menu')">
          去选购
        </van-button>
      </template>
    </van-empty>

    <!-- 购物车列表 -->
    <div class="cart-content" v-else>
      <div class="cart-list">
        <div
          class="cart-item"
          v-for="item in cartItems"
          :key="item.id"
        >
          <van-checkbox
            :model-value="item.selected"
            @change="toggleSelected(item.id)"
            checked-color="#FF4D00"
          />
          <img :src="item.image" :alt="item.name" class="item-image" />
          <div class="item-info">
            <h3 class="item-name">{{ item.name }}</h3>
            <div class="item-bottom">
              <span class="item-price">¥{{ item.price }}</span>
              <van-stepper
                v-model="item.quantity"
                :min="0"
                :max="99"
                integer
                @change="(val) => updateQuantity(item.id, val)"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 推荐商品 -->
      <div class="recommend-section">
        <div class="section-header">
          <h3 class="section-title">猜你喜欢</h3>
        </div>
        <div class="recommend-list">
          <div
            class="recommend-item"
            v-for="item in recommendItems"
            :key="item.id"
            @click="addToCart(item)"
          >
            <img :src="item.image" :alt="item.name" class="recommend-image" />
            <p class="recommend-name">{{ item.name }}</p>
            <p class="recommend-price">¥{{ item.price }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部结算栏 -->
    <div class="settlement-bar" v-if="!isEmpty">
      <div class="settlement-left">
        <van-checkbox
          :model-value="isAllSelected"
          @change="selectAll(!isAllSelected)"
          checked-color="#FF4D00"
        >
          全选
        </van-checkbox>
        <div class="total-price">
          合计：<span class="price-value">¥{{ selectedTotalPrice.toFixed(2) }}</span>
        </div>
      </div>
      <van-button
        type="primary"
        color="#FF4D00"
        :disabled="selectedCount === 0"
        @click="goToCheckout"
      >
        结算 ({{ selectedCount }})
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { showConfirmDialog, showToast } from 'vant'
import { menuItems } from '@/data/menu'
import { useCartStore } from '@/stores/cart'

const router = useRouter()
const cartStore = useCartStore()

// 初始化选中状态
const initSelected = () => {
  cartStore.cartItems.forEach(item => {
    if (item.selected === undefined) {
      item.selected = true
    }
  })
}
initSelected()

// 购物车商品
const cartItems = computed(() => cartStore.cartItems)

// 是否为空
const isEmpty = computed(() => cartStore.cartItems.length === 0)

// 推荐商品
const recommendItems = computed(() => {
  return menuItems.filter(item => !cartStore.cartItems.find(c => c.id === item.id)).slice(0, 4)
})

// 选中商品总价
const selectedTotalPrice = computed(() => {
  return cartStore.cartItems
    .filter(item => item.selected)
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
}, 0)

// 选中的商品数量
const selectedCount = computed(() => {
  return cartStore.cartItems
    .filter(item => item.selected)
    .reduce((sum, item) => sum + item.quantity, 0)
})

// 是否全选
const isAllSelected = computed(() => {
  return cartStore.cartItems.length > 0 &&
    cartStore.cartItems.every(item => item.selected)
})

// 切换选中
const toggleSelected = (itemId) => {
  cartStore.toggleSelected(itemId)
}

// 全选/取消全选
const selectAll = (selected) => {
  cartStore.selectAll(selected)
}

// 更新数量
const updateQuantity = (itemId, quantity) => {
  cartStore.updateQuantity(itemId, quantity)
}

// 添加到购物车
const addToCart = (item) => {
  cartStore.addToCart(item, 1)
  showToast({ message: '已加入购物车', position: 'bottom' })
}

// 清空购物车
const clearCart = async () => {
  try {
    await showConfirmDialog({
      title: '提示',
      message: '确定要清空购物车吗？'
    })
    cartStore.clearCart()
    showToast({ message: '购物车已清空' })
  } catch (e) {
    // 用户取消
  }
}

// 去结算
const goToCheckout = () => {
  const selectedItems = cartStore.getSelectedItems()
  if (selectedItems.length === 0) {
    showToast({ message: '请选择商品', position: 'bottom' })
    return
  }
  router.push('/order-confirm')
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.cart-page {
  min-height: 100vh;
  background-color: $bg-color;
  padding-bottom: 60px;
}

.cart-content {
  padding-bottom: 70px;
}

.cart-list {
  background-color: $bg-white;
  margin: $spacing-md;
  border-radius: $border-radius-md;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: $spacing-md;
  gap: $spacing-md;
  border-bottom: 1px solid $border-color;

  &:last-child {
    border-bottom: none;
  }
}

.item-image {
  width: 70px;
  height: 70px;
  border-radius: $border-radius-md;
  object-fit: cover;
}

.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.item-name {
  font-size: $font-size-md;
  font-weight: $font-weight-medium;
  color: $text-primary;
  margin: 0 0 auto;
}

.item-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: $spacing-sm;
}

.item-price {
  color: $price-color;
  font-weight: $font-weight-bold;
  font-size: $font-size-md;
}

:deep(.van-stepper) {
  .van-stepper__minus,
  .van-stepper__plus {
    background-color: #f5f5f5;
    color: $text-primary;
  }

  .van-stepper__input {
    background-color: #f5f5f5;
  }
}

// 推荐
.recommend-section {
  margin: $spacing-lg $spacing-md;

  .section-header {
    margin-bottom: $spacing-md;
  }

  .section-title {
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    color: $text-primary;
    margin: 0;
  }
}

.recommend-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $spacing-sm;
}

.recommend-item {
  text-align: center;

  .recommend-image {
    width: 100%;
    aspect-ratio: 1;
    border-radius: $border-radius-md;
    object-fit: cover;
    margin-bottom: $spacing-xs;
  }

  .recommend-name {
    font-size: $font-size-xs;
    color: $text-primary;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .recommend-price {
    font-size: $font-size-sm;
    color: $price-color;
    font-weight: $font-weight-bold;
    margin: 2px 0 0;
  }
}

// 底部结算栏
.settlement-bar {
  position: fixed;
  bottom: 50px;
  left: 0;
  right: 0;
  max-width: $page-max-width;
  margin: 0 auto;
  background-color: $bg-white;
  padding: $spacing-sm $spacing-md;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.settlement-left {
  display: flex;
  align-items: center;
  gap: $spacing-md;
}

.total-price {
  font-size: $font-size-md;
  color: $text-primary;

  .price-value {
    color: $price-color;
    font-weight: $font-weight-bold;
    font-size: $font-size-lg;
  }
}
</style>
