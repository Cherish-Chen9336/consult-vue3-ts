import router from '@/router'
import { useUserStore } from '@/stores'
import axios, { AxiosError, type Method } from 'axios'
import { showToast } from 'vant'

const instance = axios.create({
  // 1.基地址，超时时间
  baseURL: 'https://consult-api.itheima.net/',
  timeout: 5000
})

// 2. 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 2. 携带token
    const store = useUserStore()
    if (store.user?.token && config.headers) {
      config.headers.Authorization = `Bearer ${store.user.token}`
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (res) {
    // 对响应数据做点什么
    // 3. 处理业务失败
    if (res.data?.code !== 10000) {
      // 错误提示
      showToast(res.data.message || '业务失败')
      // 返回错误 Promise
      return Promise.reject(res.data)
      // 传入 code 将来catch 的时候使用
    }
    // 4. 摘取核心响应数据
    return res.data
  },
  function (err: AxiosError) {
    // 对响应错误做点什么
    // 5. 处理 401 错误
    if (err.response?.status === 401) {
      // 清除本地用户信息
      const store = useUserStore()
      store.delUser()
      // 跳转登录页面，携带现在访问的页面地址(路由传参)
      router.push({
        path: '/login',
        query: { returnUrl: router.currentRoute.value.fullPath }
      })
    }
    return Promise.reject(err)
  }
)

export default instance

type Data<T> = {
  code: number
  message: string
  data: T
}

export const request = <T>(
  url: string,
  method: Method = 'GET',
  submitData?: object
) => {
  return instance.request<unknown, Data<T>>({
    url,
    method,
    [method.toUpperCase() === 'GET' ? 'params' : 'data']: submitData
  })
}
