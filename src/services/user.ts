// 用户相关的 api接口函数

import type {
  CodeType,
  Patient,
  PatientList,
  User,
  UserInfo
} from '@/types/user'
import { request } from '@/utils/request'

// 密码登录接口

export const loginByPassword = (password: string, mobile: string) =>
  request<User>('/login/password', 'POST', { password, mobile })

// 发送验证码
export const sendMobileCode = (mobile: string, type: CodeType) =>
  request('/code', 'GET', { mobile, type })

// 短信验证码登录
export const loginByMobile = (mobile: string, code: string) =>
  request<User>('/login', 'POST', { mobile, code })

// 获取用户信息
export const getUserInfo = () => request<UserInfo>('/patient/myUser', 'GET')

// 查询患者详情
export const getPatientList = () =>
  request<PatientList>('/patient/mylist', 'GET')

// 添加患者信息
export const addPatient = (patient: Patient) =>
  request('/patient/add', 'POST', patient)

// 编辑患者
export const editPatient = (patient: Patient) =>
  request('/patient/update', 'PUT', patient)

// 删除患者
export const delPatient = (id: string) =>
  request(`/patient/del/${id}`, 'DELETE')
