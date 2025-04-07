import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHistory('/xiaoputao'),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/Login/index.vue')
    }
  ]
})

// console.log(import.meta)

export default router
