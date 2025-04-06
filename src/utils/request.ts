import { useUserStore } from '@/stores'
import axios from 'axios'

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
    // TODO 3. 处理业务失败

    // TODO 4. 摘取核心响应数据
    return res.data
  },
  function (error) {
    // 对响应错误做点什么
    // TODO 5. 处理 401 错误
    return Promise.reject(error)
  }
)

export default instance
