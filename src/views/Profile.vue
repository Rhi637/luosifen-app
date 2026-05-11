<template>
  <div class="profile-page">
    <!-- 顶部用户信息 -->
    <div class="profile-header">
      <div class="user-info">
        <img :src="userInfo.avatar" :alt="userInfo.name" class="avatar" />
        <div class="user-detail">
          <h2 class="username">{{ userInfo.name }}</h2>
          <div class="member-badge">
            <span class="member-level">{{ memberLevelText }}</span>
            <span class="member-points">{{ userInfo.points }} 积分</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 会员权益卡 -->
    <div class="member-card">
      <div class="member-left">
        <h3>会员专享权益</h3>
        <p>下单立减，最高省50元</p>
      </div>
      <van-button size="small" color="#FFD700" @click="$router.push('/profile')">
        立即开通
      </van-button>
    </div>

    <!-- 订单入口 -->
    <div class="order-entry">
      <div class="entry-header">
        <span class="entry-title">我的订单</span>
        <span class="entry-more" @click="$router.push('/orders')">全部订单 &gt;</span>
      </div>
      <van-grid :column-num="4" :border="false">
        <van-grid-item @click="$router.push('/orders?tab=pending')">
          <van-icon name="pending-payment" size="24" />
          <span class="entry-label">待支付</span>
        </van-grid-item>
        <van-grid-item @click="$router.push('/orders?tab=processing')">
          <van-icon name="logistics" size="24" />
          <span class="entry-label">进行中</span>
        </van-grid-item>
        <van-grid-item @click="$router.push('/orders?tab=completed')">
          <van-icon name="completed" size="24" />
          <span class="entry-label">已完成</span>
        </van-grid-item>
        <van-grid-item @click="$router.push('/orders')">
          <van-icon name="orders-o" size="24" />
          <span class="entry-label">全部</span>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 功能菜单 -->
    <div class="menu-section">
      <van-cell-group>
        <van-cell title="收货地址" is-link @click="$router.push('/addresses')">
          <template #icon>
            <van-icon name="location-o" size="20" class="cell-icon" />
          </template>
        </van-cell>
        <van-cell title="优惠券" is-link>
          <template #icon>
            <van-icon name="coupon-o" size="20" class="cell-icon" />
          </template>
          <template #value>
            <span style="color: #FF4D00;">3张可用</span>
          </template>
        </van-cell>
        <van-cell title="会员积分" is-link>
          <template #icon>
            <van-icon name="points" size="20" class="cell-icon" />
          </template>
          <template #value>
            {{ userInfo.points }} 积分
          </template>
        </van-cell>
        <van-cell title="账户余额" is-link>
          <template #icon>
            <van-icon name="balance-o" size="20" class="cell-icon" />
          </template>
          <template #value>
            ¥{{ userInfo.balance.toFixed(2) }}
          </template>
        </van-cell>
      </van-cell-group>

      <van-cell-group style="margin-top: 12px;">
        <van-cell title="客服中心" is-link>
          <template #icon>
            <van-icon name="service-o" size="20" class="cell-icon" />
          </template>
        </van-cell>
        <van-cell title="帮助中心" is-link>
          <template #icon>
            <van-icon name="question-o" size="20" class="cell-icon" />
          </template>
        </van-cell>
        <van-cell title="关于我们" is-link @click="$router.push('/about')">
          <template #icon>
            <van-icon name="info-o" size="20" class="cell-icon" />
          </template>
        </van-cell>
        <van-cell title="设置" is-link>
          <template #icon>
            <van-icon name="setting-o" size="20" class="cell-icon" />
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <!-- 底部占位 -->
    <div style="height: 20px;"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const userInfo = computed(() => userStore.userInfo)
const memberLevelText = computed(() => userStore.memberLevelText)
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.profile-page {
  min-height: 100vh;
  background-color: $bg-color;
  padding-bottom: 70px;
}

.profile-header {
  background: linear-gradient(135deg, $primary-color 0%, $primary-dark 100%);
  padding: $spacing-xxl $spacing-lg;
  padding-top: calc(#{$spacing-xxl} + #{constant(safe-area-inset-top)});
  padding-top: calc(#{$spacing-xxl} + #{env(safe-area-inset-top)});

  .user-info {
    display: flex;
    align-items: center;
    gap: $spacing-lg;
  }

  .avatar {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: 3px solid rgba(255, 255, 255, 0.3);
    object-fit: cover;
  }

  .user-detail {
    flex: 1;
  }

  .username {
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    color: $text-white;
    margin: 0 0 $spacing-xs;
  }

  .member-badge {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
  }

  .member-level {
    background: linear-gradient(135deg, #FFD700, #FFA500);
    color: $text-primary;
    font-size: $font-size-xs;
    padding: 2px 8px;
    border-radius: 10px;
    font-weight: $font-weight-medium;
  }

  .member-points {
    color: rgba(255, 255, 255, 0.8);
    font-size: $font-size-xs;
  }
}

.member-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: $spacing-md;
  padding: $spacing-lg;
  background: linear-gradient(135deg, #1A1A1A 0%, #333 100%);
  border-radius: $border-radius-lg;
  color: $text-white;

  .member-left {
    h3 {
      font-size: $font-size-md;
      font-weight: $font-weight-bold;
      margin: 0 0 4px;
      background: linear-gradient(135deg, #FFD700, #FFA500);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    p {
      font-size: $font-size-xs;
      color: rgba(255, 255, 255, 0.7);
      margin: 0;
    }
  }
}

.order-entry {
  margin: $spacing-md;
  background-color: $bg-white;
  border-radius: $border-radius-md;
  overflow: hidden;

  .entry-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $spacing-md;

    .entry-title {
      font-size: $font-size-md;
      font-weight: $font-weight-bold;
      color: $text-primary;
    }

    .entry-more {
      font-size: $font-size-sm;
      color: $text-light;
    }
  }

  :deep(.van-grid) {
    padding-bottom: $spacing-md;
  }

  :deep(.van-grid-item__content) {
    flex-direction: column;
    gap: $spacing-xs;
    padding: 0 $spacing-sm;
  }

  .entry-label {
    font-size: $font-size-xs;
    color: $text-secondary;
  }
}

.menu-section {
  margin: $spacing-md;

  :deep(.van-cell) {
    padding: $spacing-md;
  }

  :deep(.van-cell-group) {
    border-radius: $border-radius-md;
    overflow: hidden;
  }

  .cell-icon {
    color: $primary-color;
    margin-right: $spacing-sm;
  }
}
</style>
