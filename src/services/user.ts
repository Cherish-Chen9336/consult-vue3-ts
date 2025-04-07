// 用户相关的 api接口函数

import type { User } from '@/types/user'
import { request } from '@/utils/request'

// 登录接口

export const loginByPassword = (password: string, mobile: string) => {
  return request<User>('/login/password', 'POST', { password, mobile })
}
