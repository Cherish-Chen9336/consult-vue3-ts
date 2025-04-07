import CpNavBar from '@/components/CpNavBar.vue'

declare module 'vue' {
  interface GlobalComponents {
    // 添加组件的类型
    CpNavBar: typeof CpNavBar
  }
}
