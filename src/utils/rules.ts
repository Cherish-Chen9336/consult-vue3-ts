// 存放校验规则

import type { FieldRule } from 'vant'

const mobileRules: FieldRule[] = [
  { required: true, message: '手机号不能为空' },
  { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }
]

const passwordRules: FieldRule[] = [
  { required: true, message: '密码不能为空' },
  { pattern: /^\w{8,24}$/, message: '密码为8-24个字符' }
]

const codeRules: FieldRule[] = [
  { required: true, message: '验证码不能为空' },
  { pattern: /^\w{6}$/, message: '验证码为6个字符' }
]

export { mobileRules, passwordRules, codeRules }
