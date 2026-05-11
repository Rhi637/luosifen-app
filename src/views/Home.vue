<template>
  <div class="home-page">
    <!-- 顶部导航 -->
    <div class="home-header">
      <div class="header-content">
        <div class="brand-info">
          <h1 class="brand-name">螺霸王</h1>
          <span class="brand-slogan">正宗柳州螺蛳粉</span>
        </div>
        <van-search
          v-model="searchKey"
          placeholder="搜索螺蛳粉..."
          shape="round"
          background="transparent"
          @click="$router.push('/menu')"
        />
      </div>
    </div>

    <!-- 公告栏 -->
    <div class="notice-bar">
      <van-notice-bar
        left-icon="volume-o"
        :text="noticeText"
        background="#FFF8E1"
        color="#FF6B00"
      />
    </div>

    <!-- Banner轮播 -->
    <div class="banner-section">
      <van-swipe :autoplay="3000" indicator-color="#FF4D00" :show-indicators="true">
        <van-swipe-item v-for="banner in banners" :key="banner.id">
          <img :src="banner.image" :alt="banner.id" class="banner-image" @click="handleBannerClick(banner)" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 分类导航 -->
    <div class="category-nav">
      <van-grid :column-num="3" :gutter="10" square>
        <van-grid-item
          v-for="category in categories"
          :key="category.id"
          @click="goToCategory(category.id)"
        >
          <div class="category-item">
            <div class="category-icon" :style="{ backgroundColor: getCategoryColor(category.id) }">
              {{ getCategoryIcon(category.id) }}
            </div>
            <span class="category-name">{{ category.name }}</span>
          </div>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 热销推荐 -->
    <div class="hot-section">
      <div class="section-header">
        <h2 class="section-title">热销推荐</h2>
        <span class="section-more" @click="$router.push('/menu')">查看更多 &gt;</span>
      </div>
      <div class="hot-scroll">
        <div
          class="hot-item"
          v-for="item in hotItems"
          :key="item.id"
          @click="goToDetail(item)"
        >
          <div class="hot-image-wrap">
            <img :src="item.image" :alt="item.name" class="hot-image" />
            <span v-if="item.tag" class="hot-tag">{{ item.tag }}</span>
          </div>
          <div class="hot-info">
            <p class="hot-name">{{ item.name }}</p>
            <p class="hot-sales">已售{{ item.sales }}</p>
            <div class="hot-price-row">
              <span class="hot-price">¥{{ item.price }}</span>
              <van-button size="small" type="primary" color="#FF4D00" @click.stop="addToCart(item)">
                + 加购
              </van-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 推荐商品列表 -->
    <div class="recommend-section">
      <div class="section-header">
        <h2 class="section-title">为你精选</h2>
      </div>
      <div class="recommend-list">
        <div
          class="recommend-item"
          v-for="item in recommendItems"
          :key="item.id"
          @click="goToDetail(item)"
        >
          <img :src="item.image" :alt="item.name" class="recommend-image" />
          <div class="recommend-info">
            <p class="recommend-name text-ellipsis-2">{{ item.name }}</p>
            <p class="recommend-desc text-ellipsis">{{ item.description }}</p>
            <div class="recommend-bottom">
              <div class="recommend-price-wrap">
                <span class="recommend-price">¥{{ item.price }}</span>
                <span class="recommend-original">¥{{ item.originalPrice }}</span>
              </div>
              <van-icon name="shopping-cart-o" class="add-cart-icon" @click.stop="addToCart(item)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import { banners, categories, hotItems, getItemsByCategory } from '@/data/menu'
import { useCartStore } from '@/stores/cart'

const router = useRouter()
const cartStore = useCartStore()

const searchKey = ref('')
const noticeText = '新人购买袋装螺蛳粉，首袋仅需9.9元'

// 推荐商品
const recommendItems = computed(() => {
  const items = getItemsByCategory('special')
  return items.slice(0, 4)
})

// 获取分类图标
const getCategoryIcon = (id) => {
  const icons = {
    all: '🍜',
    classic: '🔥',
    special: '⭐',
    combo: '🎁',
    bag: '📦',
    drinks: '🥤'
  }
  return icons[id] || '🍜'
}

// 获取分类颜色
const getCategoryColor = (id) => {
  const colors = {
    all: '#FF4D00',
    classic: '#FF6B35',
    special: '#FFA726',
    combo: '#FFD700',
    bag: '#4CAF50',
    drinks: '#2196F3'
  }
  return colors[id] || '#FF4D00'
}

// 跳转到分类
const goToCategory = (categoryId) => {
  router.push({ path: '/menu', query: { category: categoryId } })
}

// 跳转到详情
const goToDetail = (item) => {
  router.push({ path: '/menu', query: { category: item.category, item: item.id } })
}

// 点击Banner
const handleBannerClick = (banner) => {
  if (banner.link) {
    router.push(banner.link)
  }
}

// 添加到购物车
const addToCart = (item) => {
  cartStore.addToCart(item, 1)
  showToast({ message: '已加入购物车', position: 'bottom' })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.home-page {
  background-color: $bg-color;
  padding-bottom: 70px;
}

// 顶部导航
.home-header {
  background: linear-gradient(135deg, $primary-color 0%, $primary-dark 100%);
  padding: $spacing-lg $spacing-md;
  padding-top: calc(#{$spacing-lg} + constant(safe-area-inset-top));
  padding-top: calc(#{$spacing-lg} + env(safe-area-inset-top));

  .header-content {
    display: flex;
    align-items: center;
    gap: $spacing-md;
  }

  .brand-info {
    flex-shrink: 0;
  }

  .brand-name {
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    color: $text-white;
    margin: 0;
  }

  .brand-slogan {
    font-size: $font-size-xs;
    color: rgba(255, 255, 255, 0.8);
  }

  :deep(.van-search) {
    flex: 1;
    padding: 0;
  }

  :deep(.van-search__content) {
    background-color: rgba(255, 255, 255, 0.9);
  }
}

// 公告栏
.notice-bar {
  margin-bottom: $spacing-sm;
}

// Banner
.banner-section {
  margin: $spacing-sm $spacing-md;

  .banner-image {
    width: 100%;
    height: 150px;
    border-radius: $border-radius-md;
    object-fit: cover;
  }

  :deep(.van-swipe) {
    border-radius: $border-radius-md;
  }
}

// 分类导航
.category-nav {
  margin: $spacing-md;

  .category-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .category-icon {
    width: 50px;
    height: 50px;
    border-radius: $border-radius-lg;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    margin-bottom: $spacing-xs;
  }

  .category-name {
    font-size: $font-size-sm;
    color: $text-primary;
  }
}

// 热销推荐
.hot-section {
  margin: $spacing-lg $spacing-md;

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $spacing-md;
  }

  .section-title {
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    color: $text-primary;
    margin: 0;
  }

  .section-more {
    font-size: $font-size-sm;
    color: $text-light;
  }
}

.hot-scroll {
  display: flex;
  overflow-x: auto;
  gap: $spacing-md;
  padding-bottom: $spacing-sm;

  &::-webkit-scrollbar {
    display: none;
  }
}

.hot-item {
  flex-shrink: 0;
  width: 140px;
  background-color: $bg-white;
  border-radius: $border-radius-md;
  overflow: hidden;
  box-shadow: $shadow-sm;

  .hot-image-wrap {
    position: relative;
    width: 100%;
    height: 100px;
  }

  .hot-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .hot-tag {
    position: absolute;
    top: 0;
    left: 0;
    background-color: $error-color;
    color: $text-white;
    font-size: $font-size-xs;
    padding: 2px 6px;
    border-radius: 0 $border-radius-sm 0 0;
  }

  .hot-info {
    padding: $spacing-sm;
  }

  .hot-name {
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $text-primary;
    margin-bottom: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .hot-sales {
    font-size: $font-size-xs;
    color: $text-light;
    margin-bottom: $spacing-xs;
  }

  .hot-price-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .hot-price {
    color: $price-color;
    font-weight: $font-weight-bold;
    font-size: $font-size-md;
  }
}

// 推荐商品
.recommend-section {
  margin: $spacing-lg $spacing-md;

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
  grid-template-columns: repeat(2, 1fr);
  gap: $spacing-md;
}

.recommend-item {
  background-color: $bg-white;
  border-radius: $border-radius-md;
  overflow: hidden;
  box-shadow: $shadow-sm;

  .recommend-image {
    width: 100%;
    height: 120px;
    object-fit: cover;
  }

  .recommend-info {
    padding: $spacing-sm;
  }

  .recommend-name {
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $text-primary;
    margin-bottom: 4px;
    height: 36px;
  }

  .recommend-desc {
    font-size: $font-size-xs;
    color: $text-light;
    margin-bottom: $spacing-xs;
  }

  .recommend-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .recommend-price-wrap {
    display: flex;
    align-items: baseline;
    gap: $spacing-xs;
  }

  .recommend-price {
    color: $price-color;
    font-weight: $font-weight-bold;
    font-size: $font-size-md;
  }

  .recommend-original {
    color: $original-price-color;
    font-size: $font-size-xs;
    text-decoration: line-through;
  }

  .add-cart-icon {
    font-size: 20px;
    color: $primary-color;
  }
}
</style>
