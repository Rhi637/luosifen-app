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
  // 经典螺蛳粉
  {
    id: 'c001',
    name: '经典原味螺蛳粉',
    price: 16.9,
    originalPrice: 19.9,
    category: 'classic',
    image: '/luosifen-app/images/products/classic.svg',
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
    image: '/luosifen-app/images/products/spicy.svg',
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
    image: '/luosifen-app/images/products/three-fresh.svg',
    description: '汤鲜味美，配料丰富',
    sales: 860,
    rating: 4.6
  },

  // 特色口味
  {
    id: 's001',
    name: '干捞螺蛳粉',
    price: 17.9,
    originalPrice: 21.9,
    category: 'special',
    image: '/luosifen-app/images/products/dry.svg',
    description: '干拌做法，浓郁入味',
    sales: 720,
    rating: 4.5
  },
  {
    id: 's002',
    name: '番茄螺蛳粉',
    price: 18.9,
    originalPrice: 22.9,
    category: 'special',
    image: '/luosifen-app/images/products/tomato.svg',
    description: '番茄酸甜，清爽开胃',
    sales: 650,
    rating: 4.6
  },
  {
    id: 's003',
    name: '螺蛳粉火锅',
    price: 28.9,
    originalPrice: 35.9,
    category: 'special',
    image: '/luosifen-app/images/products/hotpot.svg',
    description: '小火锅形式，料多汤浓',
    sales: 420,
    rating: 4.9
  },

  // 套餐组合
  {
    id: 'm001',
    name: '单人豪华套餐',
    price: 26.9,
    originalPrice: 32.9,
    category: 'combo',
    image: '/luosifen-app/images/products/combo1.svg',
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
    image: '/luosifen-app/images/products/combo2.svg',
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
    image: '/luosifen-app/images/products/combo3.svg',
    description: '4份螺蛳粉+4份小菜+4饮料',
    sales: 320,
    rating: 4.9
  },

  // 袋装螺蛳粉专区
  {
    id: 'b001',
    name: '螺霸王无臭螺蛳粉',
    price: 9.9,
    originalPrice: 15.9,
    category: 'bag',
    image: '/luosifen-app/images/products/bag1.svg',
    description: '改良工艺，不再有臭味',
    sales: 2360,
    rating: 4.9,
    tag: '新人专享'
  },
  {
    id: 'b002',
    name: '螺霸王高汤螺蛳粉',
    price: 13.9,
    originalPrice: 18.9,
    category: 'bag',
    image: '/luosifen-app/images/products/bag2.svg',
    description: '大骨熬制高汤，浓郁鲜美',
    sales: 1850,
    rating: 4.8
  },
  {
    id: 'b003',
    name: '螺霸王经典螺蛳粉',
    price: 12.9,
    originalPrice: 17.9,
    category: 'bag',
    image: '/luosifen-app/images/products/bag3.svg',
    description: '经典配方，地道风味',
    sales: 2100,
    rating: 4.8
  },
  {
    id: 'b004',
    name: '螺霸王麻辣螺蛳粉',
    price: 14.9,
    originalPrice: 19.9,
    category: 'bag',
    image: '/luosifen-app/images/products/bag4.svg',
    description: '麻辣过瘾，刺激味蕾',
    sales: 1650,
    rating: 4.7
  },
  {
    id: 'b005',
    name: '螺霸王礼盒装',
    price: 69.9,
    originalPrice: 89.9,
    category: 'bag',
    image: '/luosifen-app/images/products/gift.svg',
    description: '精美礼盒，送礼首选',
    sales: 680,
    rating: 4.9
  },

  // 饮品
  {
    id: 'd001',
    name: '冰镇豆奶',
    price: 5.0,
    originalPrice: 6.0,
    category: 'drinks',
    image: '/luosifen-app/images/products/drink1.svg',
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
    image: '/luosifen-app/images/products/drink2.svg',
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
    image: '/luosifen-app/images/products/drink3.svg',
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
    image: '/luosifen-app/images/products/drink4.svg',
    description: '纯净水，放心饮用',
    sales: 2000,
    rating: 4.3
  }
]

export const banners = [
  {
    id: 1,
    image: '/luosifen-app/images/banners/banner1.svg',
    link: '/menu'
  },
  {
    id: 2,
    image: '/luosifen-app/images/banners/banner2.svg',
    link: '/menu?category=bag'
  },
  {
    id: 3,
    image: '/luosifen-app/images/banners/banner3.svg',
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