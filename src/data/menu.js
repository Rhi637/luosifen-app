// 菜单数据 - 螺霸王螺蛳粉
export const categories = [
  { id: 'all', name: '全部' },
  { id: 'classic', name: '经典螺蛳粉' },
  { id: 'special', name: '特色口味' },
  { id: 'combo', name: '套餐组合' },
  { id: 'bag', name: '袋装螺蛳粉专区' },
  { id: 'drinks', name: '饮品' }
]

export const menuItems = [
  // 经典螺蛳粉（含干捞、番茄、火锅）
  {
    id: 'c001',
    name: '经典原味螺蛳粉',
    price: 16.9,
    originalPrice: 19.9,
    category: 'classic',
    image: '/luosifen-app/images/products/classic.jpg',
    description: '正宗柳州风味，酸辣鲜香',
    sales: 1560,
    rating: 4.8
  },
  {
    id: 'c002',
    name: '麻辣螺蛳粉',
    price: 18.9,
    originalPrice: 22.9,
    category: 'classic',
    image: '/luosifen-app/images/products/spicy.jpg',
    description: '麻辣鲜香，回味无穷',
    sales: 980,
    rating: 4.7
  },
  {
    id: 'c003',
    name: '三鲜螺蛳粉',
    price: 19.9,
    originalPrice: 23.9,
    category: 'classic',
    image: '/luosifen-app/images/products/three-fresh.jpg',
    description: '汤鲜味美，配料丰富',
    sales: 860,
    rating: 4.6
  },
  {
    id: 's001',
    name: '干捞螺蛳粉',
    price: 17.9,
    originalPrice: 21.9,
    category: 'classic',
    image: '/luosifen-app/images/products/dry.jpg',
    description: '干拌做法，浓郁入味',
    sales: 720,
    rating: 4.5
  },
  {
    id: 's002',
    name: '番茄螺蛳粉',
    price: 18.9,
    originalPrice: 22.9,
    category: 'classic',
    image: '/luosifen-app/images/products/tomato.jpg',
    description: '番茄酸甜，清爽开胃',
    sales: 650,
    rating: 4.6
  },
  {
    id: 's003',
    name: '螺蛳粉火锅',
    price: 28.9,
    originalPrice: 35.9,
    category: 'classic',
    image: '/luosifen-app/images/products/hotpot.jpg',
    description: '小火锅形式，料多汤浓',
    sales: 420,
    rating: 4.9
  },

  // 特色口味（无臭、高汤）
  {
    id: 'sp001',
    name: '无臭螺蛳粉',
    price: 18.9,
    originalPrice: 22.9,
    category: 'special',
    image: '/luosifen-app/images/products/bag_congee.jpg',
    description: '改良工艺，无臭味更鲜',
    sales: 1200,
    rating: 4.8,
    tag: '人气推荐'
  },
  {
    id: 'sp002',
    name: '香螺浓汤螺蛳粉',
    price: 19.9,
    originalPrice: 24.9,
    category: 'special',
    image: '/luosifen-app/images/products/bag_soup.jpg',
    description: '大骨熬制香螺浓汤，浓郁鲜美',
    sales: 980,
    rating: 4.9,
    tag: '招牌推荐'
  },
  {
    id: 'sp003',
    name: '劲爆浓汤螺蛳粉',
    price: 20.9,
    originalPrice: 25.9,
    category: 'special',
    image: '/luosifen-app/images/products/bag_mushroom.jpg',
    description: '菌菇浓汤底，鲜上加鲜',
    sales: 860,
    rating: 4.7
  },

  // 套餐组合
  {
    id: 'm001',
    name: '单人豪华套餐',
    price: 26.9,
    originalPrice: 32.9,
    category: 'combo',
    image: '/luosifen-app/images/products/combo1.jpg',
    description: '螺蛳粉+卤蛋+卤豆干+饮料',
    sales: 890,
    rating: 4.8
  },
  {
    id: 'm002',
    name: '双人分享套餐',
    price: 49.9,
    originalPrice: 59.9,
    category: 'combo',
    image: '/luosifen-app/images/products/combo2.jpg',
    description: '2份螺蛳粉+2份卤味+2饮料',
    sales: 560,
    rating: 4.7
  },
  {
    id: 'm003',
    name: '家庭欢享套餐',
    price: 79.9,
    originalPrice: 99.9,
    category: 'combo',
    image: '/luosifen-app/images/products/combo3.jpg',
    description: '4份螺蛳粉+4份小菜+4饮料',
    sales: 320,
    rating: 4.9
  },

  // 袋装螺蛳粉专区（全部使用袋装包装图片）
  {
    id: 'b001',
    name: '螺霸王经典原味 330g',
    price: 12.9,
    originalPrice: 17.9,
    category: 'bag',
    image: '/luosifen-app/images/products/bag_original.jpg',
    description: '经典配方，地道柳州风味',
    sales: 2100,
    rating: 4.8
  },
  {
    id: 'b002',
    name: '螺霸王川香麻辣 315g',
    price: 13.9,
    originalPrice: 18.9,
    category: 'bag',
    image: '/luosifen-app/images/products/bag_spicy.jpg',
    description: '川香麻辣，过瘾刺激',
    sales: 1650,
    rating: 4.7
  },
  {
    id: 'b003',
    name: '螺霸王加辣加臭 400g',
    price: 14.9,
    originalPrice: 19.9,
    category: 'bag',
    image: '/luosifen-app/images/products/bag_extra.jpg',
    description: '加辣加臭，重口味首选',
    sales: 1850,
    rating: 4.8
  },
  {
    id: 'b004',
    name: '螺霸王香螺浓汤 300g',
    price: 13.9,
    originalPrice: 18.9,
    category: 'bag',
    image: '/luosifen-app/images/products/bag_congee.jpg',
    description: '香螺浓汤，鲜美醇厚',
    sales: 1500,
    rating: 4.9
  },
  {
    id: 'b005',
    name: '螺霸王劲爆浓汤 350g',
    price: 15.9,
    originalPrice: 20.9,
    category: 'bag',
    image: '/luosifen-app/images/products/bag_soup.jpg',
    description: '劲爆浓汤，料足味浓',
    sales: 1200,
    rating: 4.8
  },
  {
    id: 'b006',
    name: '螺霸王爽辣菌菇 400g',
    price: 15.9,
    originalPrice: 20.9,
    category: 'bag',
    image: '/luosifen-app/images/products/bag_mushroom.jpg',
    description: '菌菇加持，营养丰富',
    sales: 980,
    rating: 4.7
  },
  {
    id: 'b007',
    name: '螺霸王混合口味装',
    price: 39.9,
    originalPrice: 49.9,
    category: 'bag',
    image: '/luosifen-app/images/products/bag_combo.jpg',
    description: '原味+麻辣+菌菇各1包',
    sales: 860,
    rating: 4.8
  },
  {
    id: 'b008',
    name: '螺霸王礼盒装 330g×10',
    price: 69.9,
    originalPrice: 89.9,
    category: 'bag',
    image: '/luosifen-app/images/products/bag_gift.jpg',
    description: '精美礼盒，送礼首选',
    sales: 680,
    rating: 4.9,
    tag: '热销'
  },

  // 饮品
  {
    id: 'd001',
    name: '冰镇豆奶',
    price: 5.0,
    originalPrice: 6.0,
    category: 'drinks',
    image: '/luosifen-app/images/products/drink1.jpg',
    description: '解辣神器，清爽解腻',
    sales: 1200,
    rating: 4.5
  },
  {
    id: 'd002',
    name: '柳州螺蛳粉专用酸梅汤',
    price: 6.0,
    originalPrice: 8.0,
    category: 'drinks',
    image: '/luosifen-app/images/products/drink2.jpg',
    description: '特制酸梅汤，配螺蛳粉绝配',
    sales: 980,
    rating: 4.6
  },
  {
    id: 'd003',
    name: '冰红茶',
    price: 4.0,
    originalPrice: 5.0,
    category: 'drinks',
    image: '/luosifen-app/images/products/drink3.jpg',
    description: '经典饮品，清爽解渴',
    sales: 1500,
    rating: 4.4
  },
  {
    id: 'd004',
    name: '矿泉水',
    price: 2.0,
    originalPrice: 3.0,
    category: 'drinks',
    image: '/luosifen-app/images/products/drink4.jpg',
    description: '纯净水，放心饮用',
    sales: 2000,
    rating: 4.3
  }
]

export const banners = [
  {
    id: 1,
    image: '/luosifen-app/images/banners/banner1.jpg',
    link: '/menu'
  },
  {
    id: 2,
    image: '/luosifen-app/images/banners/banner2.jpg',
    link: '/menu?category=bag'
  },
  {
    id: 3,
    image: '/luosifen-app/images/banners/banner3.jpg',
    link: '/menu?category=special'
  }
]

// 获取分类下的商品
export const getItemsByCategory = (categoryId) => {
  if (categoryId === 'all') {
    return menuItems
  }
  return menuItems.filter(item => item.category === categoryId)
}

// 根据ID获取商品
export const getItemById = (id) => {
  return menuItems.find(item => item.id === id)
}

// 热销商品
export const hotItems = menuItems.filter(item => item.sales > 500).slice(0, 6)