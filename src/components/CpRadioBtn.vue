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

<!-- <script setup lang="ts">
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

<style lang="scss" scoped></style> -->
<script setup lang="ts">
defineProps<{
  options: { label: string; value: number | string }[]
  modelValue?: number | string
}>()

defineEmits<{
  (e: 'update:modelValue', value: number | string): void
}>()
</script>

<template>
  <div class="cp-radio-btn">
    <a
      class="item"
      href="javascript:;"
      v-for="item in options"
      :key="item.value"
      :class="{ active: modelValue === item.value }"
      @click="$emit('update:modelValue', item.value)"
    >
      {{ item.label }}
    </a>
  </div>
</template>

<style lang="scss" scoped>
.cp-radio-btn {
  display: flex;
  flex-wrap: wrap;
  .item {
    margin-right: 10px;
    margin-bottom: 10px;
    padding: 0 14px;
    height: 32px;
    min-width: 60px;
    line-height: 30px;

    text-align: center;
    border: 1px solid var(--cp-bg);
    background-color: var(--cp-bg);
    block-size: border-box;
    color: var(--cp-text2);
    border-radius: 4px;
    transition: all 0.3s;
    &.active {
      border-color: var(--cp-primary);
      background-color: var(--cp-plain);
    }
  }
}
</style>
