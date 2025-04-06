<script setup lang="ts">
const fn = () => console.log('fn')
</script>

<template>
  <div class="login-page">
    <cp-nav-bar title="登录" right-text="注册" @click-right="fn"></cp-nav-bar>
    <van-checkbox>复选框</van-checkbox>
  </div>
</template>

<style lang="scss" scoped></style>
