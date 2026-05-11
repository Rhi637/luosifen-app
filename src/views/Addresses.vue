<template>
  <div class="addresses-page">
    <!-- 顶部导航 -->
    <van-nav-bar
      title="地址管理"
      left-arrow
      @click-left="$router.back()"
      fixed
      placeholder
    />

    <!-- 地址列表 -->
    <div class="address-list" v-if="addresses.length > 0">
      <van-swipe-cell v-for="address in addresses" :key="address.id">
        <van-address-item
          :address="formatAddress(address)"
          :name="address.name"
          :tel="address.phone"
          :is-default="address.isDefault"
          @edit="onEditAddress(address)"
          @click="onSelectAddress(address)"
        >
          <template #tags>
            <van-tag v-if="address.tag" type="primary">{{ address.tag }}</van-tag>
          </template>
        </van-address-item>
        <template #right>
          <van-button square type="danger" text="删除" @click="deleteAddress(address.id)" />
        </template>
      </van-swipe-cell>
    </div>

    <!-- 空状态 -->
    <van-empty v-else description="暂无收货地址" image="location">
      <template #button>
        <van-button type="primary" color="#FF4D00" @click="showAddAddress">
          添加地址
        </van-button>
      </template>
    </van-empty>

    <!-- 新增地址按钮 -->
    <div class="add-address-btn" v-if="addresses.length > 0">
      <van-button type="primary" color="#FF4D00" block @click="showAddAddress">
        <van-icon name="plus" /> 添加新地址
      </van-button>
    </div>

    <!-- 地址编辑弹窗 -->
    <van-popup v-model:show="showEditPopup" position="bottom" round style="height: 80%;">
      <van-address-edit
        v-if="showEditPopup"
        :address-info="editingAddress"
        :is-delete-show="!!editingAddress.id"
        :show-set-default="true"
        show-search-result
        search-result-placeholder="输入地址关键词搜索"
        @save="onSaveAddress"
        @delete="onDeleteAddress"
        @cancel="showEditPopup = false"
      />
    </van-popup>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { showToast, showConfirmDialog } from 'vant'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const showEditPopup = ref(false)
const editingAddress = ref({})
const isFromSelect = ref(false)

// 地址列表
const addresses = computed(() => userStore.addresses)

// 格式化地址显示
const formatAddress = (address) => {
  return `${address.province || ''}${address.city || ''}${address.county || ''}${address.detail || ''}`
}

// 显示添加地址
const showAddAddress = () => {
  editingAddress.value = {
    isDefault: addresses.value.length === 0
  }
  showEditPopup.value = true
}

// 编辑地址
const onEditAddress = (address) => {
  editingAddress.value = {
    id: address.id,
    name: address.name,
    tel: address.phone,
    province: address.province,
    city: address.city,
    county: address.county,
    addressDetail: address.detail,
    isDefault: address.isDefault,
    tag: address.tag
  }
  showEditPopup.value = true
}

// 保存地址
const onSaveAddress = (values) => {
  const addressData = {
    name: values.name,
    phone: values.tel,
    province: values.province,
    city: values.city,
    county: values.county,
    detail: values.addressDetail,
    isDefault: values.isDefault,
    tag: values.tag || ''
  }

  if (values.id) {
    userStore.updateAddress(values.id, addressData)
    showToast('地址已更新')
  } else {
    userStore.addAddress(addressData)
    showToast('地址已添加')
  }

  showEditPopup.value = false
}

// 删除地址
const onDeleteAddress = async (values) => {
  try {
    await showConfirmDialog({
      title: '提示',
      message: '确定要删除该地址吗？'
    })
    userStore.deleteAddress(values.id)
    showToast('地址已删除')
    showEditPopup.value = false
  } catch (e) {}
}

// 删除地址
const deleteAddress = async (id) => {
  try {
    await showConfirmDialog({
      title: '提示',
      message: '确定要删除该地址吗？'
    })
    userStore.deleteAddress(id)
    showToast('地址已删除')
  } catch (e) {}
}

// 选择地址
const onSelectAddress = (address) => {
  // 如果是从订单确认页面跳转来的，设置默认地址
  if (isFromSelect.value) {
    userStore.setDefaultAddress(address.id)
    router.back()
  }
}

onMounted(() => {
  // 检查是否需要选择地址模式
  const fromConfirm = router.currentRoute.value.query.from
  if (fromConfirm === 'confirm') {
    isFromSelect.value = true
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.addresses-page {
  min-height: 100vh;
  background-color: $bg-color;
  padding-bottom: 80px;
}

.address-list {
  margin: $spacing-md;

  :deep(.van-swipe-cell) {
    margin-bottom: $spacing-sm;
    border-radius: $border-radius-md;
    overflow: hidden;
  }

  :deep(.van-address-item) {
    padding: $spacing-md;
    background-color: $bg-white;
  }

  :deep(.van-address-item__value) {
    padding-right: 0;
  }

  :deep(.van-button--danger) {
    height: 100%;
    border-radius: 0;
  }
}

.add-address-btn {
  position: fixed;
  bottom: 60px;
  left: 0;
  right: 0;
  max-width: $page-max-width;
  margin: 0 auto;
  padding: $spacing-md;

  :deep(.van-button) {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $spacing-sm;
  }
}
</style>
