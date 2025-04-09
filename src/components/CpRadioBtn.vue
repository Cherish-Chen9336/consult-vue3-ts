<!-- <script setup lang="ts">
defineProps<{
  modelValue: number
}>()

defineEmits<{
  (e: 'update:modelValue', count: number): void
}>()
</script>

<template>
  <div class="cp-radio-btn">
    计数器:{{ modelValue }}
    <button @click="$emit('update:modelValue', modelValue + 1)">+1</button>
  </div>
</template>

<style lang="scss" scoped></style> -->

<script setup lang="ts">
defineProps<{
  count: number
  money: number
}>()

defineEmits<{
  (e: 'update:count', count: number): void
  (e: 'update:money', money: number): void
}>()
</script>

<template>
  <div class="cp-radio-btn">
    计数器:{{ count }}
    <button @click="$emit('update:count', count + 1)">+1</button>
    薪资:{{ money }}
    <button @click="$emit('update:money', money + 1)">+1</button>
  </div>
</template>

<style lang="scss" scoped></style>
