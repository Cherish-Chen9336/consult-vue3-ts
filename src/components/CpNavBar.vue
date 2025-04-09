<script setup lang="ts">
import { useRouter } from 'vue-router'

// 1. 通过 props 函数 动态设置标题和 右侧文字
const props = defineProps<{
  title?: string
  rightText?: string
  back?: () => void
}>()

// 2. 通过 emit 函数触发自定义事件 (点击右侧按钮)

const emit = defineEmits<{
  (e: 'click-right'): void
}>()

const onClickRight = () => {
  emit('click-right')
}

const router = useRouter()

// 3. 回退， 了解 history.state 信息 监听箭头的点击事件
const onClickLeft = () => {
  if (props.back) return props.back()
  if (history.state?.back) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>

<template>
  <!-- 需要 固定定位， 左侧箭头，中间标题， 右侧文字 -->
  <van-nav-bar
    :title="title"
    @click-left="onClickLeft"
    fixed
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
