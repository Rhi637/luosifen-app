<template>
  <div id="app">
    <router-view />
    <van-tabbar v-model="activeTab" @change="onTabChange" active-color="#FF4D00" inactive-color="#999">
      <van-tabbar-item name="home" icon="wap-home">首页</van-tabbar-item>
      <van-tabbar-item name="menu" icon="bars">菜单</van-tabbar-item>
      <van-tabbar-item name="cart" icon="shopping-cart" :badge="cartCount > 0 ? cartCount : ''">购物车</van-tabbar-item>
      <van-tabbar-item name="orders" icon="orders-o">订单</van-tabbar-item>
      <van-tabbar-item name="profile" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart'

const router = useRouter()
const route = useRoute()
const cartStore = useCartStore()

const activeTab = ref('home')

const cartCount = computed(() => cartStore.totalCount)

const tabRoutes = {
  home: '/',
  menu: '/menu',
  cart: '/cart',
  orders: '/orders',
  profile: '/profile'
}

const onTabChange = (name) => {
  router.push(tabRoutes[name])
}

onMounted(() => {
  const path = route.path
  if (path === '/' || path === '/home') {
    activeTab.value = 'home'
  } else if (path === '/menu') {
    activeTab.value = 'menu'
  } else if (path === '/cart') {
    activeTab.value = 'cart'
  } else if (path === '/orders') {
    activeTab.value = 'orders'
  } else if (path === '/profile') {
    activeTab.value = 'profile'
  }
})
</script>

<style lang="scss">
@import '@/styles/variables.scss';

#app {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 60px;
}

.van-tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}
</style>
