import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHistory('/xiaoputao'),
  routes: []
})

console.log(import.meta)

export default router
