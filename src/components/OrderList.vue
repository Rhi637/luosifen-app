<template>
  <div class="order-list-component">
    <!-- 空状态 -->
    <van-empty v-if="orders.length === 0" description="暂无订单" />

    <!-- 订单列表 -->
    <div v-else>
      <div
        class="order-card"
        v-for="order in orders"
        :key="order.id"
      >
        <div class="order-header" @click="goToDetail(order.id)">
          <div class="header-left">
            <van-icon name="shop-o" size="16" />
            <span class="shop-name">螺霸王螺蛳粉</span>
          </div>
          <span class="order-status" :style="{ color: orderStore.getStatusColor(order.status) }">
            {{ orderStore.getStatusText(order.status) }}
          </span>
        </div>

        <div class="order-content" @click="goToDetail(order.id)">
          <div class="items-preview">
            <div class="item-images">
              <img
                v-for="(item, index) in order.items.slice(0, 3)"
                :key="item.id"
                :src="item.image"
                :alt="item.name"
                class="item-img"
              />
            </div>
            <div class="items-info">
              <p class="items-count">共{{ order.items.length }}件商品</p>
              <p class="order-total">¥{{ order.totalPrice.toFixed(2) }}</p>
            </div>
          </div>
        </div>

        <div class="order-footer">
          <div class="order-time">{{ formatTime(order.createTime) }}</div>
          <div class="order-actions">
            <slot name="actions" :order="order">
              <van-button
                v-if="order.status === 'pending'"
                size="small"
                type="primary"
                color="#FF4D00"
                @click="$emit('pay', order)"
              >
                去支付
              </van-button>
              <van-button
                v-else-if="order.status === 'completed'"
                size="small"
                plain
                @click="$emit('reorder', order)"
              >
                再来一单
              </van-button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useOrderStore } from '@/stores/order'

const props = defineProps({
  orders: {
    type: Array,
    default: () => []
  }
})

defineEmits(['pay', 'reorder'])

const router = useRouter()
const orderStore = useOrderStore()

// 格式化时间
const formatTime = (timeStr) => {
  if (!timeStr) return ''
  const date = new Date(timeStr)
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hour = date.getHours().toString().padStart(2, '0')
  const minute = date.getMinutes().toString().padStart(2, '0')
  return `${month}-${day} ${hour}:${minute}`
}

// 跳转到详情
const goToDetail = (id) => {
  router.push({ path: `/order-detail/${id}` })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.order-list-component {
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

  .header-left {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
  }

  .shop-name {
    font-size: $font-size-md;
    font-weight: $font-weight-bold;
    color: $text-primary;
  }

  .order-status {
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
  }
}

.order-content {
  padding: $spacing-md;
}

.items-preview {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-images {
  display: flex;
  gap: $spacing-xs;
}

.item-img {
  width: 50px;
  height: 50px;
  border-radius: $border-radius-sm;
  object-fit: cover;

  &:not(:first-child) {
    margin-left: -20px;
  }

  &:first-child {
    margin-left: 0;
  }
}

.items-info {
  text-align: right;

  .items-count {
    font-size: $font-size-xs;
    color: $text-light;
    margin: 0 0 4px;
  }

  .order-total {
    font-size: $font-size-md;
    font-weight: $font-weight-bold;
    color: $text-primary;
    margin: 0;
  }
}

.order-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $spacing-sm $spacing-md;
  background-color: #fafafa;
}

.order-time {
  font-size: $font-size-xs;
  color: $text-light;
}

.order-actions {
  display: flex;
  gap: $spacing-sm;
}
</style>
