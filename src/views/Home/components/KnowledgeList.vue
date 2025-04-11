<script setup lang="ts">
import { ref } from 'vue'
import KnowledgeCard from './KnowledgeCard.vue'

const list = ref<number[]>([])
const loading = ref(false)
const finished = ref(false)
const onLoad = () => {
  console.log('loading')

  // 模拟加载数据
  const data = [1, 2, 3, 4, 5]
  setTimeout(() => {
    list.value.push(...data)
    // 模拟数据请求完毕
    if (list.value.length > 20) {
      finished.value = true
    }

    loading.value = false
  }, 1000)
}
</script>

<template>
  <div class="knowledge-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <knowledge-card v-for="(item, i) in list" :key="i" />
    </van-list>
  </div>
</template>

<style lang="scss" scoped>
.knowledge-list {
  padding: 0 15px;
}
</style>
