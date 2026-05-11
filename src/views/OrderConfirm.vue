<template>
  <div class="order-confirm-page">
    <!-- 顶部导航 -->
    <van-nav-bar
      title="确认订单"
      left-arrow
      @click-left="$router.back()"
      fixed
      placeholder
    />

    <!-- 收货地址 -->
    <div class="address-section" @click="showAddressPicker = true">
      <div class="address-info" v-if="selectedAddress">
        <van-icon name="location" color="#FF4D00" size="24" />
        <div class="address-detail">
          <div class="address-header">
            <span class="address-name">{{ selectedAddress.name }}</span>
            <span class="address-phone">{{ selectedAddress.phone }}</span>
          </div>
          <p class="address-text">{{ getFullAddress(selectedAddress) }}</p>
        </div>
        <van-icon name="arrow" color="#999" />
      </div>
      <div class="no-address" v-else @click="showAddressPicker = true">
        <van-icon name="plus" size="24" />
        <span>添加收货地址</span>
        <van-icon name="arrow" color="#999" />
      </div>
    </div>

    <!-- 配送时间 -->
    <div class="delivery-section">
      <div class="section-label">配送时间</div>
      <van-radio-group v-model="deliveryType" direction="horizontal">
        <van-radio name="immediate" shape="square">立即配送</van-radio>
        <van-radio name="scheduled" shape="square">预约时间</van-radio>
      </van-radio-group>
      <van-field
        v-if="deliveryType === 'scheduled'"
        v-model="scheduledTime"
        is-link
        readonly
        label="预约时间"
        placeholder="选择预约时间"
        @click="showTimePicker = true"
      />
    </div>

    <!-- 商品列表 -->
    <div class="goods-section">
      <div class="section-title">商品清单</div>
      <div class="goods-list">
        <div class="goods-item" v-for="item in selectedItems" :key="item.id">
          <img :src="item.image" :alt="item.name" class="goods-image" />
          <div class="goods-info">
            <h4 class="goods-name">{{ item.name }}</h4>
            <p class="goods-spec">x{{ item.quantity }}</p>
          </div>
          <span class="goods-price">¥{{ (item.price * item.quantity).toFixed(2) }}</span>
        </div>
      </div>
    </div>

    <!-- 备注 -->
    <div class="remark-section">
      <van-field
        v-model="remark"
        label="备注"
        placeholder="口味偏好、特殊要求等"
      />
    </div>

    <!-- 优惠信息 -->
    <div class="coupon-section">
      <van-cell title="优惠券" is-link :value="couponText" @click="showCouponPicker = true" />
      <van-cell title="积分抵扣" is-link :value="`-¥${pointsDeduction.toFixed(2)}`" />
    </div>

    <!-- 价格明细 -->
    <div class="price-section">
      <van-cell-group>
        <van-cell title="商品金额">
          <template #value>
            <span class="price-text">¥{{ goodsAmount.toFixed(2) }}</span>
          </template>
        </van-cell>
        <van-cell title="配送费">
          <template #value>
            <span class="price-text">¥{{ deliveryFee.toFixed(2) }}</span>
          </template>
        </van-cell>
        <van-cell title="包装费">
          <template #value>
            <span class="price-text">¥{{ packageFee.toFixed(2) }}</span>
          </template>
        </van-cell>
        <van-cell title="优惠券">
          <template #value>
            <span class="price-text discount">-¥{{ couponDiscount.toFixed(2) }}</span>
          </template>
        </van-cell>
        <van-cell title="积分抵扣">
          <template #value>
            <span class="price-text discount">-¥{{ pointsDeduction.toFixed(2) }}</span>
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <!-- 底部提交栏 -->
    <div class="submit-bar">
      <div class="total-info">
        <span class="total-label">合计：</span>
        <span class="total-price">¥{{ totalPrice.toFixed(2) }}</span>
      </div>
      <van-button
        type="primary"
        color="#FF4D00"
        :loading="isSubmitting"
        @click="submitOrder"
      >
        提交订单
      </van-button>
    </div>

    <!-- 地址选择弹窗 -->
    <van-popup v-model:show="showAddressPicker" position="bottom" round>
      <van-address-list
        v-model="selectedAddressId"
        :list="addressList"
        default-tag-text="默认"
        @select="onAddressSelect"
        @add="onAddressAdd"
      />
    </van-popup>

    <!-- 时间选择 -->
    <van-popup v-model:show="showTimePicker" position="bottom" round>
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        title="选择预约时间"
        :min-date="minDate"
        @confirm="onTimeConfirm"
        @cancel="showTimePicker = false"
      />
    </van-popup>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { showToast, showDialog } from 'vant'
import { useCartStore } from '@/stores/cart'
import { useOrderStore } from '@/stores/order'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const cartStore = useCartStore()
const orderStore = useOrderStore()
const userStore = useUserStore()

const selectedAddressId = ref('')
const deliveryType = ref('immediate')
const scheduledTime = ref('')
const remark = ref('')
const showAddressPicker = ref(false)
const showTimePicker = ref(false)
const showCouponPicker = ref(false)
const isSubmitting = ref(false)
const couponDiscount = ref(0)
const pointsDeduction = ref(0)

const minDate = new Date()
const currentDate = ref(new Date())

// 选中的商品
const selectedItems = computed(() => {
  return cartStore.cartItems.filter(item => item.selected)
})

// 收货地址列表
const addressList = computed(() => {
  return userStore.addresses.map(addr => ({
    ...addr,
    address: userStore.getFullAddress(addr)
  }))
})

// 选中的地址
const selectedAddress = computed(() => {
  return userStore.addresses.find(addr => addr.id === selectedAddressId.value) ||
    userStore.getDefaultAddress
})

// 商品金额
const goodsAmount = computed(() => {
  return selectedItems.value.reduce((sum, item) => {
    return sum + item.price * item.quantity
  }, 0)
})

// 配送费
const deliveryFee = computed(() => {
  return goodsAmount.value >= 30 ? 0 : 3
})

// 包装费
const packageFee = computed(() => {
  return selectedItems.value.length * 1
})

// 总价
const totalPrice = computed(() => {
  return goodsAmount.value + deliveryFee.value + packageFee.value - couponDiscount.value - pointsDeduction.value
})

// 优惠券文字
const couponText = computed(() => {
  if (couponDiscount.value > 0) {
    return `-¥${couponDiscount.value.toFixed(2)}`
  }
  return '暂无可用'
})

// 获取完整地址
const getFullAddress = (address) => {
  return userStore.getFullAddress(address)
}

// 选择地址
const onAddressSelect = (item) => {
  selectedAddressId.value = item.id
  showAddressPicker.value = false
}

// 新增地址
const onAddressAdd = () => {
  showAddressPicker.value = false
  router.push('/addresses')
}

// 时间选择确认
const onTimeConfirm = (value) => {
  const date = new Date(value)
  scheduledTime.value = date.toLocaleString()
  showTimePicker.value = false
}

// 提交订单
const submitOrder = async () => {
  if (!selectedAddress.value) {
    showToast('请选择收货地址')
    return
  }

  if (selectedItems.value.length === 0) {
    showToast('请选择商品')
    return
  }

  isSubmitting.value = true

  try {
    const order = orderStore.createOrder({
      items: selectedItems.value.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity
      })),
      totalPrice: totalPrice.value,
      address: selectedAddress.value,
      remark: remark.value
    })

    // 清空购物车中选中的商品
    selectedItems.value.forEach(item => {
      cartStore.removeFromCart(item.id)
    })

    showToast('订单提交成功')
    router.replace({ path: '/pay-success', query: { orderId: order.id, amount: totalPrice.value } })
  } catch (error) {
    showToast('订单提交失败')
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  // 设置默认地址
  const defaultAddr = userStore.getDefaultAddress
  if (defaultAddr) {
    selectedAddressId.value = defaultAddr.id
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.order-confirm-page {
  min-height: 100vh;
  background-color: $bg-color;
  padding-bottom: 60px;
}

.address-section {
  background-color: $bg-white;
  margin: $spacing-md;
  border-radius: $border-radius-md;
  padding: $spacing-md;
}

.address-info {
  display: flex;
  align-items: center;
  gap: $spacing-md;

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

.no-address {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  color: $text-light;
  padding: $spacing-sm 0;

  span {
    flex: 1;
    font-size: $font-size-md;
  }
}

.delivery-section {
  background-color: $bg-white;
  margin: 0 $spacing-md $spacing-md;
  border-radius: $border-radius-md;
  padding: $spacing-md;

  .section-label {
    font-size: $font-size-md;
    font-weight: $font-weight-medium;
    color: $text-primary;
    margin-bottom: $spacing-sm;
  }

  :deep(.van-radio-group) {
    margin-bottom: $spacing-sm;
  }
}

.goods-section {
  background-color: $bg-white;
  margin: 0 $spacing-md $spacing-md;
  border-radius: $border-radius-md;
  overflow: hidden;

  .section-title {
    font-size: $font-size-md;
    font-weight: $font-weight-bold;
    color: $text-primary;
    padding: $spacing-md;
    border-bottom: 1px solid $border-color;
  }
}

.goods-list {
  padding: $spacing-md;
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

.remark-section {
  background-color: $bg-white;
  margin: 0 $spacing-md $spacing-md;
  border-radius: $border-radius-md;
}

.coupon-section {
  background-color: $bg-white;
  margin: 0 $spacing-md $spacing-md;
  border-radius: $border-radius-md;
}

.price-section {
  margin: 0 $spacing-md;

  :deep(.van-cell-group) {
    border-radius: $border-radius-md;
    overflow: hidden;
  }

  .price-text {
    color: $text-primary;
  }

  .discount {
    color: $error-color;
  }
}

.submit-bar {
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

.total-info {
  display: flex;
  align-items: baseline;
  gap: $spacing-xs;
}

.total-label {
  font-size: $font-size-md;
  color: $text-secondary;
}

.total-price {
  font-size: $font-size-xxl;
  font-weight: $font-weight-bold;
  color: $price-color;
}
</style>
