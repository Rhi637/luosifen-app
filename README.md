# 🍜 螺霸王螺蛳粉 - 校园外卖H5应用

一款专为校园场景打造的螺蛳粉外卖H5应用，基于 Vue 3 + Vite + Vant 4 开发，支持 GitHub Pages 免费部署。

![Vue 3](https://img.shields.io/badge/Vue-3.5+-green.svg)
![Vite](https://img.shields.io/badge/Vite-8.0+-blue.svg)
![Vant](https://img.shields.io/badge/Vant-4.0+-red.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## ✨ 功能特性

### 🛒 核心功能
- **首页** - Banner 轮播、分类导航、热销推荐、公告通知
- **菜单浏览** - 分类 Tab 切换、商品搜索、规格选择、加料定制
- **购物车** - 商品管理、数量调整、全选/单选、备注
- **下单支付** - 地址选择、模拟支付（微信/支付宝/校园卡）
- **订单跟踪** - 实时状态流转（待支付→制作中→配送中→已完成）
- **个人中心** - 用户信息、订单统计、地址管理

### 🎨 设计特色
- **螺蛳粉主题配色** - 暖橙红色系 (#E65100)，贴合螺霸王品牌
- **移动端优先** - 完美适配手机屏幕
- **流畅动画** - 页面转场、购物车交互
- **本地存储** - 数据持久化，刷新不丢失

## 🍜 菜单分类

| 分类 | 说明 |
|------|------|
| 经典螺蛳粉 | 招牌螺蛳粉、无臭螺蛳粉、高汤螺蛳粉 |
| 特色口味 | 肥肠、牛肉、花甲、番茄 |
| 套餐组合 | 单人餐、双人餐、宿舍团建餐 |
| 袋装螺蛳粉专区 | 螺霸王无臭版、高汤版、经典版（袋装） |
| 饮品 | 可乐、雪碧、酸梅汤 |

### 袋装专区商品

| 商品名称 | 规格 | 价格 |
|---------|------|------|
| 螺霸王无臭螺蛳粉 | 330g/袋 | ¥9.9（新人价） |
| 螺霸王高汤螺蛳粉 | 330g/袋 | ¥13.9 |
| 螺霸王经典螺蛳粉 | 330g/袋 | ¥12.9 |

## 🚀 快速开始

### 环境要求
- Node.js 18+
- npm 9+

### 本地开发

```bash
# 克隆项目
git clone https://github.com/Rhi637/luosifen-app.git
cd luosifen-app

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:5173/luosifen-app/ 查看应用

### 构建生产版本

```bash
npm run build
```

构建后的文件位于 `dist/` 目录

## 📦 部署到 GitHub Pages

### 方法一：GitHub Pages 直接部署

1. 进入仓库 **Settings → Pages**
2. Source 选择 **Deploy from a branch**
3. Branch 选择 **main**，文件夹选 **/ (root)**
4. 点击 **Save**
5. 等待部署完成，访问 `https://rhi637.github.io/luosifen-app/`

### 方法二：手动部署

```bash
npm run build
npm run deploy
```

## 🏗️ 项目结构

```
luosifen-app/
├── src/
│   ├── components/        # 公共组件
│   │   └── OrderList.vue  # 订单列表组件
│   ├── data/              # 数据层
│   │   └── menu.js        # 菜品数据（分类、商品、规格）
│   ├── router/            # 路由配置
│   │   └── index.js       # 页面路由定义
│   ├── stores/            # Pinia 状态管理
│   │   ├── cart.js        # 购物车状态
│   │   ├── order.js       # 订单状态
│   │   └── user.js        # 用户状态
│   ├── styles/            # 全局样式
│   │   ├── variables.scss # 主题变量（螺蛳粉配色）
│   │   └── global.scss    # 全局通用样式
│   ├── utils/             # 工具函数
│   │   └── storage.js     # localStorage 封装
│   ├── views/             # 页面组件
│   │   ├── Home.vue       # 首页
│   │   ├── Menu.vue       # 菜单页
│   │   ├── Cart.vue       # 购物车
│   │   ├── Orders.vue     # 订单列表
│   │   ├── OrderConfirm.vue  # 确认订单
│   │   ├── OrderDetail.vue   # 订单详情
│   │   ├── PaySuccess.vue    # 支付成功
│   │   ├── Profile.vue    # 个人中心
│   │   └── Addresses.vue  # 地址管理
│   ├── App.vue            # 根组件（底部导航栏）
│   └── main.js            # 入口文件
├── public/
│   └── uploads/           # 袋装螺蛳粉产品图片
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🛠️ 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Vue 3 | 3.5+ | 前端框架（Composition API） |
| Vite | 8.0+ | 构建工具 |
| Vue Router | 4.x | 路由管理 |
| Pinia | 3.x | 状态管理 |
| Vant 4 | 4.x | 移动端 UI 组件库 |
| SCSS | 1.99+ | CSS 预处理器 |

## 🔧 自定义配置

### 修改主题色
编辑 `src/styles/variables.scss`：
```scss
:root {
  --color-primary: #E65100;        // 主色调（螺蛳粉橙红）
  --color-secondary: #FFAB00;      // 辅助色（金黄）
}
```

### 修改菜单数据
编辑 `src/data/menu.js` 添加或修改商品

### 修改校园地址
编辑 `src/views/Addresses.vue` 中的地址建议列表

### 修改公告内容
编辑 `src/views/Home.vue` 中的公告栏文本

## 📄 许可证

[MIT](LICENSE) © 2024 螺霸王螺蛳粉

## 🙏 致谢

- [Vue.js](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Vant](https://vant-ui.github.io/vant/)
- [Pinia](https://pinia.vuejs.org/)
- [螺霸王](https://www.luobawang.com/) - 品牌灵感来源

---

Made with ❤️ and 🍜
