# 螺霸王螺蛳粉外卖App

一款基于 Vue 3 + Vite + Vant 4 构建的螺蛳粉外卖点餐小程序，适配移动端H5页面。

## 功能特性

- 首页：Banner轮播、分类导航、热销推荐
- 菜单：分类筛选、商品搜索、加购功能
- 购物车：商品管理、数量调整、结算
- 订单：订单确认、支付、订单列表、订单详情
- 个人中心：用户信息、收货地址管理

## 技术栈

- **前端框架**: Vue 3 (Composition API)
- **构建工具**: Vite 5
- **路由**: Vue Router 4
- **状态管理**: Pinia
- **UI组件库**: Vant 4
- **样式**: SCSS

## 项目结构

```
luosifen-app/
├── src/
│   ├── components/     # 公共组件
│   ├── data/           # 静态数据
│   ├── router/         # 路由配置
│   ├── stores/         # Pinia状态管理
│   ├── styles/         # 全局样式
│   ├── utils/          # 工具函数
│   ├── views/          # 页面组件
│   ├── App.vue         # 根组件
│   └── main.js         # 入口文件
├── .github/
│   └── workflows/      # GitHub Actions
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 安装与运行

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 部署

项目配置了 GitHub Actions 自动部署到 GitHub Pages。

推送到 `main` 或 `master` 分支将自动触发构建和部署。

手动部署：
```bash
npm run deploy
```

## 品牌信息

- **品牌名**: 螺霸王螺蛳粉
- **公告**: 新人购买袋装螺蛳粉，首袋仅需9.9元

## 袋装专区商品

| 商品名称 | 价格 |
|---------|------|
| 螺霸王无臭螺蛳粉 | ¥9.9 |
| 螺霸王高汤螺蛳粉 | ¥13.9 |
| 螺霸王经典螺蛳粉 | ¥12.9 |
| 螺霸王麻辣螺蛳粉 | ¥14.9 |
| 螺霸王礼盒装 | ¥69.9 |

## 许可证

MIT License
