<script setup lang="ts">
import type { Doctor } from '@/types/consult'

defineProps<{
  item: Doctor
}>()
</script>

<template>
  <div class="doctor-card">
    <!-- 头像 -->
    <van-image round :src="item.avatar" />
    <!-- 主要信息 -->
    <div class="info">
      <h4 class="name">{{ item.name }}</h4>
      <p class="van-ellipsis">{{ item.hospitalName }} {{ item.depName }}</p>
      <p>{{ item.positionalTitles }}</p>
    </div>
    <van-button round size="small" type="primary">{{
      item.likeFlag === 1 ? '已关注' : '+ 关注'
    }}</van-button>
  </div>
</template>

<style lang="scss" scoped>
.doctor-card {
  width: 135px;
  height: 190px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0px 0px 11px 0px rgba(229, 229, 229, 0.2);
  text-align: center;
  padding: 15px;
  margin-left: 15px;
  display: inline-block;
  box-sizing: border-box;
  > .van-image {
    width: 58px;
    height: 58px;
    vertical-align: top;
    // border-radius: 50%;
    margin: 0 auto 8px;
  }
  .info {
    .name {
      font-size: 13px;
      color: var(--cp-text1);
      margin-bottom: 5px;
    }
    p {
      font-size: 11px;
      margin-bottom: 0;
      color: var(--cp-tip);
    }
  }
  .van-button {
    padding: 0 12px;
    height: 28px;
    margin-top: 8px;
    width: 72px;
  }
}
</style>
