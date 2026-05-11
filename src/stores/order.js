import { defineStore } from 'pinia'
import { ref } from 'vue'
import { storage } from '@/utils/storage'

const ORDERS_KEY = 'luosifen_orders'

export const useOrderStore = defineStore('order', () => {
  // 从localStorage恢复订单数据
  const orders = ref(storage.get(ORDERS_KEY) || [])

  // 保存到localStorage
  const saveOrders = () => {
    storage.set(ORDERS_KEY, orders.value)
  }

  // 生成订单ID
  const generateOrderId = () => {
    return 'LF' + Date.now() + Math.random().toString(36).substr(2, 6).toUpperCase()
  }

  // 创建订单
  const createOrder = (orderData) => {
    const order = {
      id: generateOrderId(),
      items: orderData.items,
      totalPrice: orderData.totalPrice,
      address: orderData.address,
      remark: orderData.remark || '',
      status: 'pending', // pending, confirmed, cooking, delivering, completed, cancelled
      createTime: new Date().toISOString(),
      payTime: null,
      deliveryTime: null,
      completeTime: null
    }

    orders.value.unshift(order)
    saveOrders()

    return order
  }

  // 根据ID获取订单
  const getOrderById = (id) => {
    return orders.value.find(order => order.id === id)
  }

  // 更新订单状态
  const updateOrderStatus = (orderId, status) => {
    const order = orders.value.find(o => o.id === orderId)
    if (order) {
      order.status = status

      if (status === 'paid') {
        order.payTime = new Date().toISOString()
        order.status = 'confirmed'
      } else if (status === 'delivering') {
        order.status = 'delivering'
      } else if (status === 'completed') {
        order.completeTime = new Date().toISOString()
      } else if (status === 'cancelled') {
        order.status = 'cancelled'
      }

      saveOrders()
    }
  }

  // 获取订单状态文本
  const getStatusText = (status) => {
    const statusMap = {
      pending: '待支付',
      paid: '已支付',
      confirmed: '待接单',
      cooking: '制作中',
      delivering: '配送中',
      completed: '已完成',
      cancelled: '已取消'
    }
    return statusMap[status] || status
  }

  // 获取订单状态颜色
  const getStatusColor = (status) => {
    const colorMap = {
      pending: '#FF9800',
      paid: '#4CAF50',
      confirmed: '#2196F3',
      cooking: '#FF9800',
      delivering: '#2196F3',
      completed: '#4CAF50',
      cancelled: '#999'
    }
    return colorMap[status] || '#999'
  }

  // 模拟支付
  const payOrder = (orderId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        updateOrderStatus(orderId, 'paid')
        resolve(true)
      }, 1000)
    })
  }

  // 模拟商家接单
  const confirmOrder = (orderId) => {
    setTimeout(() => {
      updateOrderStatus(orderId, 'confirmed')
    }, 2000)
  }

  // 模拟配送
  const startDelivery = (orderId) => {
    setTimeout(() => {
      updateOrderStatus(orderId, 'delivering')
    }, 5000)
  }

  return {
    orders,
    createOrder,
    getOrderById,
    updateOrderStatus,
    getStatusText,
    getStatusColor,
    payOrder,
    confirmOrder,
    startDelivery
  }
})
