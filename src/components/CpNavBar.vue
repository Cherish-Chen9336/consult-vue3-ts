<script setup lang="ts"></script>

<template>
  <!-- 需要 固定定位， 左侧箭头，中间标题， 右侧文字 -->
  <van-nav-bar fixed title="标题" right-text="注册" left-arrow></van-nav-bar>
</template>

<style lang="scss" scoped>
:deep() {
  .van-nav-bar {
    &__arrow {
      font-size: 18px;
      color: var(--cp-text1);
    }
    &__title {
      font-size: 15px;
    }
  }
}
</style>
