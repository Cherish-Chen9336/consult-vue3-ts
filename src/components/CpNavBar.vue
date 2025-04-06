<script setup lang="ts">
// 1. 通过 props 函数 动态设置标题和 右侧文字
defineProps<{
  title?: string
  rightText?: string
}>()

// 2. 通过 emit 函数触发自定义事件 (点击右侧按钮)

const emit = defineEmits<{
  (e: 'click-right'): void
}>()

const onClickRight = () => {
  emit('click-right')
}
</script>

<template>
  <!-- 需要 固定定位， 左侧箭头，中间标题， 右侧文字 -->
  <van-nav-bar
    :title="title"
    left-arrow
    :right-text="rightText"
    @click-right="onClickRight"
  ></van-nav-bar>
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
