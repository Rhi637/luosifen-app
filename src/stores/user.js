import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { storage } from '@/utils/storage'

const USER_KEY = 'luosifen_user'
const ADDRESS_KEY = 'luosifen_addresses'

export const useUserStore = defineStore('user', () => {
  // 用户信息
  const userInfo = ref(storage.get(USER_KEY) || {
    id: 'user_' + Date.now(),
    name: '螺蛳粉爱好者',
    phone: '138****8888',
    avatar: '/luosifen-app/images/avatar.svg',
    memberLevel: 'gold',
    points: 520,
    balance: 100.00
  })

  // 收货地址列表
  const addresses = ref(storage.get(ADDRESS_KEY) || [
    {
      id: 'addr_001',
      name: '张三',
      phone: '13800138000',
      province: '广西壮族自治区',
      city: '柳州市',
      county: '城中区',
      detail: '万达广场A座1201室',
      isDefault: true,
      tag: '家'
    },
    {
      id: 'addr_002',
      name: '李四',
      phone: '13900139000',
      province: '广西壮族自治区',
      city: '柳州市',
      county: '鱼峰区',
      detail: '龙潭公园旁美食街18号',
      isDefault: false,
      tag: '公司'
    }
  ])

  // 保存用户信息
  const saveUserInfo = () => {
    storage.set(USER_KEY, userInfo.value)
  }

  // 保存地址列表
  const saveAddresses = () => {
    storage.set(ADDRESS_KEY, addresses.value)
  }

  // 更新用户信息
  const updateUserInfo = (info) => {
    userInfo.value = { ...userInfo.value, ...info }
    saveUserInfo()
  }

  // 获取默认地址
  const getDefaultAddress = computed(() => {
    return addresses.value.find(addr => addr.isDefault) || addresses.value[0] || null
  })

  // 添加地址
  const addAddress = (address) => {
    const newAddress = {
      ...address,
      id: 'addr_' + Date.now()
    }

    // 如果是默认地址，取消其他默认
    if (newAddress.isDefault) {
      addresses.value.forEach(addr => {
        addr.isDefault = false
      })
    }

    addresses.value.push(newAddress)
    saveAddresses()
    return newAddress
  }

  // 更新地址
  const updateAddress = (addressId, address) => {
    const index = addresses.value.findIndex(addr => addr.id === addressId)
    if (index > -1) {
      // 如果设置为默认，取消其他默认
      if (address.isDefault) {
        addresses.value.forEach(addr => {
          addr.isDefault = false
        })
      }

      addresses.value[index] = { ...addresses.value[index], ...address }
      saveAddresses()
    }
  }

  // 删除地址
  const deleteAddress = (addressId) => {
    const index = addresses.value.findIndex(addr => addr.id === addressId)
    if (index > -1) {
      addresses.value.splice(index, 1)
      saveAddresses()
    }
  }

  // 设置默认地址
  const setDefaultAddress = (addressId) => {
    addresses.value.forEach(addr => {
      addr.isDefault = addr.id === addressId
    })
    saveAddresses()
  }

  // 获取地址完整字符串
  const getFullAddress = (address) => {
    return `${address.province}${address.city}${address.county}${address.detail}`
  }

  // 会员等级文字
  const memberLevelText = computed(() => {
    const levels = {
      normal: '普通会员',
      silver: '银牌会员',
      gold: '金牌会员',
      platinum: '铂金会员',
      diamond: '钻石会员'
    }
    return levels[userInfo.value.memberLevel] || '普通会员'
  })

  return {
    userInfo,
    addresses,
    updateUserInfo,
    getDefaultAddress,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    getFullAddress,
    memberLevelText
  }
})
