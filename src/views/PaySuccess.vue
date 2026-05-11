<template>
  <div class="pay-success-page">
    <div class="success-content">
      <div class="success-icon">
        <van-icon name="checked" color="#4CAF50" size="80" />
      </div>
      <h2 class="success-title">支付成功</h2>
      <p class="success-amount">¥{{ orderAmount }}</p>
      <p class="success-tip">您的订单已提交，请在订单详情查看配送进度</p>
    </div>

    <div class="action-buttons">
      <van-button type="primary" color="#FF4D00" block @click="goToOrderDetail">
        查看订单
      </van-button>
      <van-button plain block @click="goToHome" style="margin-top: 12px;">
        返回首页
      </van-button>
    </div>

    <!-- 推荐商品 -->
    <div class="recommend-section">
      <h3 class="section-title">热销推荐</h3>
      <div class="recommend-list">
        <div
          class="recommend-item"
          v-for="item in recommendItems"
          :key="item.id"
          @click="goToMenu"
        >
          <img :src="item.image" :alt="item.name" class="recommend-image" />
          <div class="recommend-info">
            <p class="recommend-name">{{ item.name }}</p>
            <p class="recommend-price">¥{{ item.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { menuItems } from '@/data/menu'

const router = useRouter()
const route = useRoute()

const orderId = ref('')
const orderAmount = ref('0.00')

// 推荐商品
const recommendItems = computed(() => {
  return menuItems.filter(item => item.sales > 500).slice(0, 4)
})

// 查看订单详情
const goToOrderDetail = () => {
  if (orderId.value) {
    router.replace({ path: `/order-detail/${orderId.value}` })
  } else {
    router.replace('/orders')
  }
}

// 返回首页
const goToHome = () => {
  router.replace('/')
}

// 去菜单
const goToMenu = () => {
  router.push('/menu')
}

onMounted(() => {
  if (route.query.orderId) {
    orderId.value = route.query.orderId
  }
  if (route.query.amount) {
    orderAmount.value = parseFloat(route.query.amount).toFixed(2)
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.pay-success-page {
  min-height: 100vh;
  background-color: $bg-color;
  padding: $spacing-xxl $spacing-lg;
}

.success-content {
  text-align: center;
  background-color: $bg-white;
  border-radius: $border-radius-lg;
  padding: $spacing-xxl;
  margin-bottom: $spacing-lg;
}

.success-icon {
  margin-bottom: $spacing-lg;
}

.success-title {
  font-size: $font-size-xl;
  font-weight: $font-weight-bold;
  color: $text-primary;
  margin: 0 0 $spacing-md;
}

.success-amount {
  font-size: 36px;
  font-weight: $font-weight-bold;
  color: $price-color;
  margin: 0 0 $spacing-lg;
}

.success-tip {
  font-size: $font-size-sm;
  color: $text-light;
  margin: 0;
}

.action-buttons {
  margin-bottom: $spacing-lg;
}

.recommend-section {
  .section-title {
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    color: $text-primary;
    margin: 0 0 $spacing-md;
  }
}

.recommend-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $spacing-md;
}

.recommend-item {
  background-color: $bg-white;
  border-radius: $border-radius-md;
  overflow: hidden;

  .recommend-image {
    width: 100%;
    height: 100px;
    object-fit: cover;
  }

  .recommend-info {
    padding: $spacing-sm;
  }

  .recommend-name {
    font-size: $font-size-sm;
    color: $text-primary;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .recommend-price {
    font-size: $font-size-md;
    color: $price-color;
    font-weight: $font-weight-bold;
    margin: 4px 0 0;
  }
}
</style>
