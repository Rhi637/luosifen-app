<template>
  <div class="orders-page">
    <!-- 顶部导航 -->
    <van-nav-bar
      title="我的订单"
      fixed
      placeholder
    />

    <!-- 订单标签 -->
    <van-tabs v-model:active="activeTab" sticky @change="onTabChange">
      <van-tab title="全部" name="all" />
      <van-tab title="待支付" name="pending" />
      <van-tab title="进行中" name="processing" />
      <van-tab title="已完成" name="completed" />
    </van-tabs>

    <!-- 订单列表 -->
    <div class="order-list">
      <van-empty v-if="filteredOrders.length === 0" description="暂无订单" image="orders">
        <template #button>
          <van-button type="primary" color="#FF4D00" @click="$router.push('/menu')">
            去下单
          </van-button>
        </template>
      </van-empty>

      <div
        class="order-card"
        v-for="order in filteredOrders"
        :key="order.id"
        @click="goToDetail(order.id)"
      >
        <div class="order-header">
          <span class="order-id">订单号：{{ order.id }}</span>
          <span class="order-status" :style="{ color: orderStore.getStatusColor(order.status) }">
            {{ orderStore.getStatusText(order.status) }}
          </span>
        </div>

        <div class="order-items">
          <div class="order-item" v-for="item in order.items.slice(0, 3)" :key="item.id">
            <img :src="item.image" :alt="item.name" class="item-image" />
            <div class="item-info">
              <p class="item-name">{{ item.name }}</p>
              <p class="item-price">¥{{ item.price }} x {{ item.quantity }}</p>
            </div>
          </div>
          <div class="more-items" v-if="order.items.length > 3">
            共{{ order.items.length }}件商品...
          </div>
        </div>

        <div class="order-footer">
          <div class="order-info">
            <span class="order-time">{{ formatTime(order.createTime) }}</span>
            <span class="order-total">实付：<span class="total-price">¥{{ order.totalPrice.toFixed(2) }}</span></span>
          </div>
          <div class="order-actions" @click.stop>
            <van-button
              v-if="order.status === 'pending'"
              size="small"
              type="primary"
              color="#FF4D00"
              @click="goToPay(order)"
            >
              去支付
            </van-button>
            <van-button
              v-if="order.status === 'completed'"
              size="small"
              plain
              @click="$router.push({ path: '/order-detail', query: { id: order.id } })"
            >
              查看详情
            </van-button>
            <van-button
              v-if="order.status === 'delivering'"
              size="small"
              plain
              @click="$router.push({ path: '/order-detail', query: { id: order.id } })"
            >
              查看配送
            </van-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useOrderStore } from '@/stores/order'

const router = useRouter()
const orderStore = useOrderStore()

const activeTab = ref('all')

// 过滤订单
const filteredOrders = computed(() => {
  const orders = orderStore.orders

  if (activeTab.value === 'all') {
    return orders
  } else if (activeTab.value === 'pending') {
    return orders.filter(o => ['pending'].includes(o.status))
  } else if (activeTab.value === 'processing') {
    return orders.filter(o => ['confirmed', 'cooking', 'delivering'].includes(o.status))
  } else if (activeTab.value === 'completed') {
    return orders.filter(o => ['completed', 'cancelled'].includes(o.status))
  }

  return orders
})

// 格式化时间
const formatTime = (timeStr) => {
  const date = new Date(timeStr)
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hour = date.getHours().toString().padStart(2, '0')
  const minute = date.getMinutes().toString().padStart(2, '0')
  return `${month}-${day} ${hour}:${minute}`
}

// 标签切换
const onTabChange = (name) => {
  activeTab.value = name
}

// 跳转到详情
const goToDetail = (id) => {
  router.push({ path: '/order-detail', query: { id } })
}

// 去支付
const goToPay = (order) => {
  router.push('/order-confirm')
}

onMounted(() => {
  // 刷新订单状态
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.orders-page {
  min-height: 100vh;
  background-color: $bg-color;
  padding-bottom: 20px;
}

.order-list {
  padding: $spacing-md;
}

.order-card {
  background-color: $bg-white;
  border-radius: $border-radius-md;
  margin-bottom: $spacing-md;
  overflow: hidden;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $spacing-md;
  border-bottom: 1px solid $border-color;

  .order-id {
    font-size: $font-size-sm;
    color: $text-light;
  }

  .order-status {
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
  }
}

.order-items {
  padding: $spacing-md;
}

.order-item {
  display: flex;
  gap: $spacing-md;
  margin-bottom: $spacing-sm;

  &:last-of-type {
    margin-bottom: 0;
  }
}

.item-image {
  width: 50px;
  height: 50px;
  border-radius: $border-radius-sm;
  object-fit: cover;
}

.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.item-name {
  font-size: $font-size-sm;
  color: $text-primary;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-price {
  font-size: $font-size-xs;
  color: $text-light;
  margin: 0;
}

.more-items {
  font-size: $font-size-xs;
  color: $text-light;
  text-align: center;
  margin-top: $spacing-sm;
}

.order-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $spacing-md;
  background-color: #fafafa;
}

.order-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.order-time {
  font-size: $font-size-xs;
  color: $text-light;
}

.order-total {
  font-size: $font-size-sm;
  color: $text-primary;

  .total-price {
    color: $price-color;
    font-weight: $font-weight-bold;
  }
}

.order-actions {
  display: flex;
  gap: $spacing-sm;
}
</style>
