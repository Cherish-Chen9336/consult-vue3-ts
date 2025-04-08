import { useUserStore } from '@/stores'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHistory('/xiaoputao'),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/Login/index.vue')
    },
    {
      path: '/',
      redirect: '/home',
      component: () => import('@/views/Layout/index.vue'),
      children: [
        {
          path: '/home',
          component: () => import('@/views/Home/index.vue')
        },
        {
          path: '/article',
          component: () => import('@/views/Article/index.vue')
        },
        {
          path: '/notify',
          component: () => import('@/views/Notify/index.vue')
        },
        {
          path: '/user',
          component: () => import('@/views/User/index.vue')
        }
      ]
    }
  ]
})

// console.log(import.meta)

// 全局前置导航
router.beforeEach((to) => {
  // 获取token
  const store = useUserStore()
  // 声明白名单
  const whiteList = ['/login']
  // 判断如果不存在token， 或不在白名单，则需要拦截
  if (!store.user?.token && !whiteList.includes(to.path)) return '/login'
})

export default router
