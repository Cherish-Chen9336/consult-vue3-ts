<script setup lang="ts">
import { ref } from 'vue'
import KnowledgeCard from './KnowledgeCard.vue'
import type {
  KnowledgeType,
  KnowledgeList,
  KnowledgeParams
} from '@/types/consult'
import { getKnowledgePage } from '@/services/consult'

const porps = defineProps<{
  type: KnowledgeType
}>()

const loading = ref(false)
const finished = ref(false)

const list = ref<KnowledgeList>([])
const params = ref<KnowledgeParams>({
  type: porps.type,
  current: 1,
  pageSize: 6
})

const onLoad = async () => {
  console.log('loading')

  // // 模拟加载数据
  // const data = [1, 2, 3, 4, 5]
  // setTimeout(() => {
  //   list.value.push(...data)
  //   // 模拟数据请求完毕
  //   if (list.value.length > 20) {
  //     finished.value = true
  //   }

  //   loading.value = false
  // }, 1000)

  const res = await getKnowledgePage(params.value)
  // 加载更多
  list.value.push(...res.data.rows)
  // 判断是否有更多数据
  if (params.value.current >= res.data.pageTotal) {
    finished.value = true
  } else {
    params.value.current++
  }

  loading.value = false
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
      <knowledge-card v-for="(item, i) in list" :key="i" :item="item" />
    </van-list>
  </div>
</template>

<style lang="scss" scoped>
.knowledge-list {
  padding: 0 15px;
}
</style>
