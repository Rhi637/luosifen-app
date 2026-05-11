<template>
  <div class="menu-page">
    <!-- 顶部导航 -->
    <van-nav-bar
      title="商品菜单"
      left-arrow
      @click-left="$router.back()"
      fixed
      placeholder
    />

    <!-- 搜索框 -->
    <div class="search-bar">
      <van-search
        v-model="searchKey"
        placeholder="搜索商品..."
        shape="round"
        @search="onSearch"
      />
    </div>

    <!-- 分类侧边栏 + 商品列表 -->
    <div class="menu-content">
      <!-- 左侧分类 -->
      <div class="category-sidebar">
        <van-sidebar v-model="activeCategory" @change="onCategoryChange">
          <van-sidebar-item
            v-for="category in categories"
            :key="category.id"
            :title="category.name"
          />
        </van-sidebar>
      </div>

      <!-- 右侧商品列表 -->
      <div class="product-list">
        <div class="category-title">{{ currentCategoryName }}</div>

        <div class="product-items" v-if="filteredItems.length > 0">
          <div
            class="product-item"
            v-for="item in filteredItems"
            :key="item.id"
            @click="showProductDetail(item)"
          >
            <img :src="item.image" :alt="item.name" class="product-image" />
            <div class="product-info">
              <div class="product-header">
                <h3 class="product-name">{{ item.name }}</h3>
                <span v-if="item.tag" class="product-tag">{{ item.tag }}</span>
              </div>
              <p class="product-desc">{{ item.description }}</p>
              <div class="product-meta">
                <span class="product-sales">已售 {{ item.sales }}</span>
                <span class="product-rating">
                  <van-icon name="star" color="#FFD700" />
                  {{ item.rating }}
                </span>
              </div>
              <div class="product-bottom">
                <div class="product-price-wrap">
                  <span class="product-price">¥{{ item.price }}</span>
                  <span class="product-original">¥{{ item.originalPrice }}</span>
                </div>
                <div class="product-actions">
                  <van-stepper
                    v-if="getCartQuantity(item.id) > 0"
                    v-model="item.quantity"
                    :min="0"
                    :max="99"
                    integer
                    @change="(val) => updateCartQuantity(item, val)"
                    @click.stop
                  />
                  <van-button
                    v-else
                    size="small"
                    type="primary"
                    color="#FF4D00"
                    @click.stop="addToCart(item)"
                  >
                    + 加购
                  </van-button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <van-empty v-else description="该分类暂无商品" />
      </div>
    </div>

    <!-- 底部购物车悬浮栏 -->
    <div class="cart-bar" v-if="cartCount > 0" @click="$router.push('/cart')">
      <div class="cart-info">
        <van-badge :content="cartCount" max="99">
          <div class="cart-icon-wrap">
            <van-icon name="shopping-cart" class="cart-icon" />
          </div>
        </van-badge>
        <div class="cart-price-wrap">
          <span class="cart-total-price">¥{{ cartStore.totalPrice.toFixed(2) }}</span>
        </div>
      </div>
      <van-button type="primary" color="#FF4D00" size="small" @click.stop="$router.push('/order-confirm')">
        去结算
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showToast, showDialog } from 'vant'
import { categories, menuItems, getItemsByCategory, getItemById } from '@/data/menu'
import { useCartStore } from '@/stores/cart'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

const searchKey = ref('')
const activeCategory = ref(0)

// 初始化本地商品数量
const initLocalQuantity = () => {
  menuItems.forEach(item => {
    const cartItem = cartStore.cartItems.find(i => i.id === item.id)
    item.quantity = cartItem ? cartItem.quantity : 0
  })
}

// 当前分类名称
const currentCategoryName = computed(() => {
  return categories[activeCategory.value]?.name || ''
})

// 筛选商品
const filteredItems = computed(() => {
  const categoryId = categories[activeCategory.value]?.id
  let items = getItemsByCategory(categoryId)

  // 如果是袋装专区，排序让9.9元商品在前
  if (categoryId === 'bag') {
    items = [...items].sort((a, b) => {
      if (a.price === 9.9) return -1
      if (b.price === 9.9) return 1
      return a.price - b.price
    })
  }

  // 搜索过滤
  if (searchKey.value) {
    items = items.filter(item =>
      item.name.includes(searchKey.value) ||
      item.description.includes(searchKey.value)
    )
  }

  return items
})

// 获取购物车中商品数量
const getCartQuantity = (itemId) => {
  const item = menuItems.find(i => i.id === itemId)
  return item?.quantity || 0
}

// 购物车数量
const cartCount = computed(() => cartStore.totalCount)

// 分类切换
const onCategoryChange = (index) => {
  searchKey.value = ''
}

// 搜索
const onSearch = (val) => {
  if (!val) {
    return
  }
  // 搜索所有分类
  const allItems = menuItems.filter(item =>
    item.name.includes(val) || item.description.includes(val)
  )
  if (allItems.length > 0) {
    const categoryId = allItems[0].category
    const index = categories.findIndex(c => c.id === categoryId)
    if (index > -1) {
      activeCategory.value = index
    }
  }
}

// 添加到购物车
const addToCart = (item) => {
  cartStore.addToCart(item, 1)
  item.quantity = 1
  showToast({ message: '已加入购物车', position: 'bottom' })
}

// 更新购物车数量
const updateCartQuantity = (item, val) => {
  const diff = val - (item.quantity || 0)
  if (diff > 0) {
    cartStore.addToCart(item, diff)
  } else if (diff < 0) {
    cartStore.updateQuantity(item.id, val)
  }
  item.quantity = val
}

// 显示商品详情
const showProductDetail = (item) => {
  showDialog({
    title: item.name,
    message: `
      <div style="text-align: left;">
        <img src="${item.image}" style="width: 100%; border-radius: 8px; margin-bottom: 10px;" />
        <p style="margin-bottom: 8px;"><strong>描述：</strong>${item.description}</p>
        <p style="margin-bottom: 8px;"><strong>已售：</strong>${item.sales}份</p>
        <p style="margin-bottom: 8px;"><strong>评分：</strong>${item.rating}星</p>
        <p style="color: #FF4D00; font-size: 18px; font-weight: bold;">¥${item.price} <span style="text-decoration: line-through; color: #999; font-size: 12px;">¥${item.originalPrice}</span></p>
      </div>
    `,
    confirmButtonText: '加入购物车',
    confirmButtonColor: '#FF4D00'
  }).then(() => {
    addToCart(item)
  }).catch(() => {})
}

onMounted(() => {
  initLocalQuantity()

  // 处理路由参数
  if (route.query.category) {
    const index = categories.findIndex(c => c.id === route.query.category)
    if (index > -1) {
      activeCategory.value = index
    }
  }
})

// 监听路由参数变化
watch(() => route.query, (query) => {
  if (query.category) {
    const index = categories.findIndex(c => c.id === query.category)
    if (index > -1) {
      activeCategory.value = index
    }
  }
}, { immediate: true })
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.menu-page {
  min-height: 100vh;
  background-color: $bg-color;
  padding-bottom: 60px;
}

.search-bar {
  background-color: $bg-white;
  padding: $spacing-sm $spacing-md;
}

.menu-content {
  display: flex;
  background-color: $bg-white;
}

.category-sidebar {
  width: 80px;
  flex-shrink: 0;
  background-color: #f7f7f7;

  :deep(.van-sidebar) {
    width: 100%;
  }

  :deep(.van-sidebar-item) {
    padding: $spacing-lg $spacing-sm;
    font-size: $font-size-sm;
  }

  :deep(.van-sidebar-item--select) {
    background-color: $bg-white;
    color: $primary-color;
    border-left: 3px solid $primary-color;
  }
}

.product-list {
  flex: 1;
  padding: $spacing-md;
}

.category-title {
  font-size: $font-size-lg;
  font-weight: $font-weight-bold;
  color: $text-primary;
  margin-bottom: $spacing-md;
  padding-bottom: $spacing-sm;
  border-bottom: 1px solid $border-color;
}

.product-items {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.product-item {
  display: flex;
  gap: $spacing-md;
  padding-bottom: $spacing-md;
  border-bottom: 1px solid $border-light;

  &:last-child {
    border-bottom: none;
  }
}

.product-image {
  width: 90px;
  height: 90px;
  border-radius: $border-radius-md;
  object-fit: cover;
  flex-shrink: 0;
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-header {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
}

.product-name {
  font-size: $font-size-md;
  font-weight: $font-weight-bold;
  color: $text-primary;
  margin: 0;
}

.product-tag {
  font-size: $font-size-xs;
  color: $text-white;
  background-color: $error-color;
  padding: 1px 4px;
  border-radius: 2px;
}

.product-desc {
  font-size: $font-size-xs;
  color: $text-light;
  margin: 4px 0;
}

.product-meta {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  font-size: $font-size-xs;
  color: $text-light;
  margin-bottom: auto;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 2px;
}

.product-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: $spacing-sm;
}

.product-price-wrap {
  display: flex;
  align-items: baseline;
  gap: $spacing-xs;
}

.product-price {
  font-size: $font-size-lg;
  font-weight: $font-weight-bold;
  color: $price-color;
}

.product-original {
  font-size: $font-size-xs;
  color: $original-price-color;
  text-decoration: line-through;
}

.product-actions {
  :deep(.van-stepper) {
    .van-stepper__minus,
    .van-stepper__plus {
      background-color: $primary-color;
      color: white;
    }
  }
}

// 底部购物车栏
.cart-bar {
  position: fixed;
  bottom: 50px;
  left: 0;
  right: 0;
  max-width: $page-max-width;
  margin: 0 auto;
  background-color: $text-primary;
  padding: $spacing-sm $spacing-md;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  border-radius: $border-radius-xl $border-radius-xl 0 0;

  .cart-info {
    display: flex;
    align-items: center;
    gap: $spacing-md;
  }

  .cart-icon-wrap {
    width: 40px;
    height: 40px;
    background-color: $primary-color;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cart-icon {
    font-size: 24px;
    color: $text-white;
  }

  .cart-price-wrap {
    color: $text-white;
  }

  .cart-total-price {
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
  }
}
</style>
