<template>
  <div class="about-page">
    <!-- 顶部导航 -->
    <van-nav-bar
      title="关于我们"
      left-arrow
      fixed
      placeholder
      @click-left="$router.back()"
    />

    <!-- 品牌信息 -->
    <div class="brand-section">
      <div class="brand-logo">
        <van-icon name="fire-o" size="48" color="#FFAB00" />
      </div>
      <h2 class="brand-name">螺霸王螺蛳粉</h2>
      <p class="brand-slogan">正宗柳州风味 · 酸辣鲜香 · 一口入魂</p>
      <van-tag type="danger" round>v1.0.0</van-tag>
    </div>

    <!-- 品牌介绍 -->
    <div class="about-card">
      <h3 class="card-title">
        <van-icon name="shop-o" />
        品牌故事
      </h3>
      <p class="card-text">
        螺霸王螺蛳粉源于广西柳州，秉承传统工艺，精选优质螺蛳熬制高汤，
        搭配酸笋、腐竹、花生、木耳等经典配料，还原地道柳州味道。
        我们致力于为校园师生提供便捷、美味、实惠的螺蛳粉外卖服务。
      </p>
    </div>

    <!-- 产品特色 -->
    <div class="about-card">
      <h3 class="card-title">
        <van-icon name="star-o" />
        产品特色
      </h3>
      <div class="feature-list">
        <div class="feature-item">
          <div class="feature-icon">🍜</div>
          <div class="feature-info">
            <h4>正宗柳州风味</h4>
            <p>传统工艺熬制螺蛳高汤，酸辣鲜香</p>
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-icon">🌿</div>
          <div class="feature-info">
            <h4>无臭版可选</h4>
            <p>去味留鲜，宿舍友好，不影响室友</p>
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-icon">🦴</div>
          <div class="feature-info">
            <h4>高汤版升级</h4>
            <p>大骨慢熬，16cm大兰花干，汤浓味醇</p>
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-icon">📦</div>
          <div class="feature-info">
            <h4>袋装即享</h4>
            <p>新人首袋9.9元，宿舍囤货必备</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 联系我们 -->
    <div class="about-card">
      <h3 class="card-title">
        <van-icon name="phone-o" />
        联系我们
      </h3>
      <van-cell-group :border="false">
        <van-cell title="客服电话" value="400-888-8888" is-link />
        <van-cell title="营业时间" value="09:00 - 22:00" />
        <van-cell title="配送范围" value="全校范围" />
        <van-cell title="配送费" value="满20元免配送费" />
      </van-cell-group>
    </div>

    <!-- 技术信息 -->
    <div class="about-card">
      <h3 class="card-title">
        <van-icon name="setting-o" />
        技术信息
      </h3>
      <van-cell-group :border="false">
        <van-cell title="前端框架" value="Vue 3" />
        <van-cell title="UI 组件" value="Vant 4" />
        <van-cell title="构建工具" value="Vite" />
        <van-cell title="状态管理" value="Pinia" />
        <van-cell title="部署平台" value="GitHub Pages" />
      </van-cell-group>
    </div>

    <!-- 开源许可 -->
    <div class="about-card">
      <h3 class="card-title">
        <van-icon name="certificate" />
        开源许可
      </h3>
      <p class="card-text">
        本项目基于 MIT 开源许可证发布。
        感谢 Vue.js、Vite、Vant、Pinia 等优秀的开源项目。
      </p>
      <van-button
        plain
        size="small"
        round
        icon="link-o"
        style="margin-top: 12px;"
        @click="goToGithub"
      >
        查看源代码
      </van-button>
    </div>

    <!-- 底部信息 -->
    <div class="about-footer">
      <p>螺霸王螺蛳粉 © 2024</p>
      <p>Made with ❤️ and 🍜</p>
    </div>
  </div>
</template>

<script setup>
const goToGithub = () => {
  window.open('https://github.com/Rhi637/luosifen-app', '_blank')
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.about-page {
  min-height: 100vh;
  background-color: $bg-color;
  padding-bottom: 30px;
}

:deep(.van-nav-bar) {
  background: linear-gradient(135deg, $primary-color 0%, $primary-dark 100%);

  .van-nav-bar__title,
  .van-nav-bar__arrow {
    color: white;
  }
}

.brand-section {
  background: linear-gradient(135deg, $primary-color 0%, $primary-dark 100%);
  padding: $spacing-xxl $spacing-lg;
  text-align: center;
  color: white;

  .brand-logo {
    width: 80px;
    height: 80px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto $spacing-md;
  }

  .brand-name {
    font-size: 24px;
    font-weight: $font-weight-bold;
    margin: 0 0 $spacing-sm;
  }

  .brand-slogan {
    font-size: $font-size-sm;
    opacity: 0.9;
    margin: 0 0 $spacing-md;
  }
}

.about-card {
  margin: $spacing-md;
  padding: $spacing-lg;
  background: $bg-white;
  border-radius: $border-radius-md;
  box-shadow: $shadow-sm;

  .card-title {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    font-size: $font-size-md;
    font-weight: $font-weight-bold;
    color: $text-primary;
    margin: 0 0 $spacing-md;

    .van-icon {
      color: $primary-color;
    }
  }

  .card-text {
    font-size: $font-size-sm;
    color: $text-secondary;
    line-height: 1.8;
    margin: 0;
  }
}

.feature-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;

  .feature-item {
    display: flex;
    align-items: flex-start;
    gap: $spacing-md;
    padding: $spacing-sm 0;

    &:not(:last-child) {
      border-bottom: 1px solid $border-color;
    }

    .feature-icon {
      font-size: 28px;
      flex-shrink: 0;
    }

    .feature-info {
      h4 {
        font-size: $font-size-sm;
        font-weight: $font-weight-medium;
        color: $text-primary;
        margin: 0 0 4px;
      }

      p {
        font-size: $font-size-xs;
        color: $text-light;
        margin: 0;
      }
    }
  }
}

:deep(.van-cell-group) {
  background: transparent;
}

:deep(.van-cell) {
  padding: $spacing-sm 0;

  .van-cell__title {
    color: $text-secondary;
  }

  .van-cell__value {
    color: $text-primary;
    font-weight: $font-weight-medium;
  }
}

.about-footer {
  text-align: center;
  padding: $spacing-xl $spacing-lg;

  p {
    font-size: $font-size-xs;
    color: $text-light;
    margin: $spacing-xs 0;
  }
}
</style>
