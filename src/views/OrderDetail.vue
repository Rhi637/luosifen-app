<template>
  <div class="order-detail-page">
    <!-- 顶部导航 -->
    <van-nav-bar
      title="订单详情"
      left-arrow
      @click-left="$router.back()"
      fixed
      placeholder
    />

    <!-- 订单状态 -->
    <div class="order-status-section" :style="{ backgroundColor: statusBgColor }">
      <div class="status-info">
        <van-icon :name="statusIcon" size="40" color="#fff" />
        <div class="status-text">
          <h3>{{ orderStatusText }}</h3>
          <p>{{ statusDescription }}</p>
        </div>
      </div>
    </div>

    <!-- 收货信息 -->
    <div class="address-section">
      <van-icon name="location" color="#FF4D00" size="24" />
      <div class="address-detail">
        <div class="address-header">
          <span class="address-name">{{ order?.address?.name }}</span>
          <span class="address-phone">{{ order?.address?.phone }}</span>
        </div>
        <p class="address-text">{{ fullAddress }}</p>
      </div>
    </div>

    <!-- 订单信息 -->
    <div class="order-info-section">
      <div class="info-header">
        <span class="order-id">订单号：{{ order?.id }}</span>
        <span class="order-time">{{ formatTime(order?.createTime) }}</span>
      </div>

      <!-- 商品列表 -->
      <div class="goods-list">
        <div class="goods-item" v-for="item in order?.items" :key="item.id">
          <img :src="item.image" :alt="item.name" class="goods-image" />
          <div class="goods-info">
            <h4 class="goods-name">{{ item.name }}</h4>
            <p class="goods-spec">x{{ item.quantity }}</p>
          </div>
          <span class="goods-price">¥{{ (item.price * item.quantity).toFixed(2) }}</span>
        </div>
      </div>

      <!-- 备注 -->
      <div class="remark-row" v-if="order?.remark">
        <span class="label">备注：</span>
        <span class="value">{{ order.remark }}</span>
      </div>

      <!-- 价格明细 -->
      <div class="price-detail">
        <div class="price-row">
          <span class="label">商品金额</span>
          <span class="value">¥{{ goodsAmount.toFixed(2) }}</span>
        </div>
        <div class="price-row">
          <span class="label">配送费</span>
          <span class="value">¥{{ deliveryFee.toFixed(2) }}</span>
        </div>
        <div class="price-row">
          <span class="label">包装费</span>
          <span class="value">¥{{ packageFee.toFixed(2) }}</span>
        </div>
        <div class="price-row total">
          <span class="label">实付金额</span>
          <span class="value">¥{{ order?.totalPrice?.toFixed(2) }}</span>
        </div>
      </div>
    </div>

    <!-- 配送进度 -->
    <div class="progress-section" v-if="showProgress">
      <h3 class="section-title">配送进度</h3>
      <van-steps :active="progressActive" direction="vertical" active-color="#FF4D00">
        <van-step>
          <h4>订单已提交</h4>
          <p>{{ formatTime(order?.createTime) }}</p>
        </van-step>
        <van-step v-if="order?.payTime">
          <h4>支付成功</h4>
          <p>{{ formatTime(order.payTime) }}</p>
        </van-step>
        <van-step>
          <h4>商家接单</h4>
          <p>骑手正在取餐</p>
        </van-step>
        <van-step>
          <h4>配送中</h4>
          <p>预计30分钟内送达</p>
        </van-step>
        <van-step v-if="order?.completeTime">
          <h4>已完成</h4>
          <p>{{ formatTime(order.completeTime) }}</p>
        </van-step>
      </van-steps>
    </div>

    <!-- 联系骑手 -->
    <div class="contact-section" v-if="order?.status === 'delivering'">
      <van-button type="primary" color="#FF4D00" block>
        <van-icon name="phone-o" /> 联系骑手
      </van-button>
    </div>

    <!-- 底部操作按钮 -->
    <div class="bottom-actions" v-if="showActions">
      <van-button v-if="order?.status === 'pending'" plain @click="cancelOrder">
        取消订单
      </van-button>
      <van-button v-if="order?.status === 'pending'" type="primary" color="#FF4D00" @click="goToPay">
        去支付
      </van-button>
      <van-button v-if="order?.status === 'completed'" type="primary" color="#FF4D00" @click="reOrder">
       再来一单
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { showConfirmDialog, showToast } from 'vant'
import { useOrderStore } from '@/stores/order'
import { useCartStore } from '@/stores/cart'
import { getItemById } from '@/data/menu'

const router = useRouter()
const route = useRoute()
const orderStore = useOrderStore()
const cartStore = useCartStore()

const orderId = ref('')
const order = ref(null)

// 订单状态文本
const orderStatusText = computed(() => {
  return order.value ? orderStore.getStatusText(order.value.status) : ''
})

// 订单状态背景色
const statusBgColor = computed(() => {
  const status = order.value?.status
  if (status === 'completed') return '#4CAF50'
  if (status === 'cancelled') return '#999'
  return '#FF4D00'
})

// 状态图标
const statusIcon = computed(() => {
  const status = order.value?.status
  if (status === 'completed') return 'completed'
  if (status === 'cancelled') return 'cross'
  if (status === 'delivering') return 'logistics'
  return 'clock'
})

// 状态描述
const statusDescription = computed(() => {
  const status = order.value?.status
  const descriptions = {
    pending: '请尽快完成支付',
    confirmed: '商家已接单，正在准备中',
    cooking: '美食正在制作中',
    delivering: '骑手正在配送中',
    completed: '感谢您的光临，欢迎下次再来',
    cancelled: '订单已取消'
  }
  return descriptions[status] || ''
})

// 完整地址
const fullAddress = computed(() => {
  if (!order.value?.address) return ''
  const addr = order.value.address
  return `${addr.province || ''}${addr.city || ''}${addr.county || ''}${addr.detail || ''}`
})

// 商品金额
const goodsAmount = computed(() => {
  if (!order.value?.items) return 0
  return order.value.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
})

// 配送费
const deliveryFee = computed(() => {
  return goodsAmount.value >= 30 ? 0 : 3
})

// 包装费
const packageFee = computed(() => {
  return order.value?.items?.length * 1 || 0
})

// 是否显示进度
const showProgress = computed(() => {
  return ['confirmed', 'cooking', 'delivering', 'completed'].includes(order.value?.status)
})

// 进度当前步骤
const progressActive = computed(() => {
  const status = order.value?.status
  const map = {
    pending: 0,
    paid: 1,
    confirmed: 2,
    cooking: 2,
    delivering: 3,
    completed: 4
  }
  return map[status] || 0
})

// 是否显示底部操作
const showActions = computed(() => {
  return ['pending', 'completed'].includes(order.value?.status)
})

// 格式化时间
const formatTime = (timeStr) => {
  if (!timeStr) return ''
  const date = new Date(timeStr)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hour = date.getHours().toString().padStart(2, '0')
  const minute = date.getMinutes().toString().padStart(2, '0')
  return `${year}-${month}-${day} ${hour}:${minute}`
}

// 取消订单
const cancelOrder = async () => {
  try {
    await showConfirmDialog({
      title: '提示',
      message: '确定要取消该订单吗？'
    })
    orderStore.updateOrderStatus(orderId.value, 'cancelled')
    showToast('订单已取消')
  } catch (e) {}
}

// 去支付
const goToPay = () => {
  router.push('/order-confirm')
}

// 再来一单
const reOrder = async () => {
  if (!order.value?.items) return

  for (const item of order.value.items) {
    const product = getItemById(item.id)
    if (product) {
      cartStore.addToCart(product, item.quantity)
    }
  }

  showToast('已加入购物车')
  router.push('/cart')
}

onMounted(() => {
  orderId.value = route.params.id || route.query.id
  if (orderId.value) {
    order.value = orderStore.getOrderById(orderId.value)
  }

  if (!order.value) {
    showToast('订单不存在')
    router.back()
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.order-detail-page {
  min-height: 100vh;
  background-color: $bg-color;
  padding-bottom: 70px;
}

.order-status-section {
  padding: $spacing-xxl $spacing-lg;

  .status-info {
    display: flex;
    align-items: center;
    gap: $spacing-lg;
    color: $text-white;
  }

  .status-text {
    h3 {
      font-size: $font-size-xl;
      font-weight: $font-weight-bold;
      margin: 0 0 $spacing-xs;
    }

    p {
      font-size: $font-size-sm;
      margin: 0;
      opacity: 0.9;
    }
  }
}

.address-section {
  display: flex;
  gap: $spacing-md;
  background-color: $bg-white;
  margin: $spacing-md;
  padding: $spacing-md;
  border-radius: $border-radius-md;

  .address-detail {
    flex: 1;
  }

  .address-header {
    display: flex;
    gap: $spacing-md;
    margin-bottom: $spacing-xs;
  }

  .address-name {
    font-size: $font-size-md;
    font-weight: $font-weight-bold;
    color: $text-primary;
  }

  .address-phone {
    font-size: $font-size-md;
    color: $text-secondary;
  }

  .address-text {
    font-size: $font-size-sm;
    color: $text-light;
    margin: 0;
  }
}

.order-info-section {
  background-color: $bg-white;
  margin: $spacing-md;
  padding: $spacing-md;
  border-radius: $border-radius-md;
}

.info-header {
  display: flex;
  justify-content: space-between;
  padding-bottom: $spacing-md;
  border-bottom: 1px solid $border-color;

  .order-id {
    font-size: $font-size-sm;
    color: $text-light;
  }

  .order-time {
    font-size: $font-size-sm;
    color: $text-light;
  }
}

.goods-list {
  padding: $spacing-md 0;
}

.goods-item {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  margin-bottom: $spacing-md;

  &:last-child {
    margin-bottom: 0;
  }
}

.goods-image {
  width: 50px;
  height: 50px;
  border-radius: $border-radius-sm;
  object-fit: cover;
}

.goods-info {
  flex: 1;
}

.goods-name {
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  color: $text-primary;
  margin: 0;
}

.goods-spec {
  font-size: $font-size-xs;
  color: $text-light;
  margin: 2px 0 0;
}

.goods-price {
  font-size: $font-size-md;
  font-weight: $font-weight-bold;
  color: $text-primary;
}

.remark-row {
  padding: $spacing-md 0;
  border-top: 1px solid $border-color;
  font-size: $font-size-sm;

  .label {
    color: $text-light;
  }

  .value {
    color: $text-primary;
  }
}

.price-detail {
  padding-top: $spacing-md;
  border-top: 1px solid $border-color;
}

.price-row {
  display: flex;
  justify-content: space-between;
  font-size: $font-size-sm;
  margin-bottom: $spacing-sm;

  .label {
    color: $text-secondary;
  }

  .value {
    color: $text-primary;
  }

  &.total {
    margin-top: $spacing-sm;
    padding-top: $spacing-sm;
    border-top: 1px solid $border-color;
    font-size: $font-size-md;
    font-weight: $font-weight-bold;

    .value {
      color: $price-color;
    }
  }
}

.progress-section {
  background-color: $bg-white;
  margin: $spacing-md;
  padding: $spacing-md;
  border-radius: $border-radius-md;

  .section-title {
    font-size: $font-size-md;
    font-weight: $font-weight-bold;
    color: $text-primary;
    margin: 0 0 $spacing-md;
  }

  :deep(.van-step__title) {
    h4 {
      font-size: $font-size-sm;
      margin: 0;
    }

    p {
      font-size: $font-size-xs;
      margin: 4px 0 0;
    }
  }
}

.contact-section {
  margin: $spacing-md;

  :deep(.van-button) {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $spacing-sm;
  }
}

.bottom-actions {
  position: fixed;
  bottom: 50px;
  left: 0;
  right: 0;
  max-width: $page-max-width;
  margin: 0 auto;
  background-color: $bg-white;
  padding: $spacing-sm $spacing-md;
  display: flex;
  justify-content: flex-end;
  gap: $spacing-md;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
}
</style>
