export type User = {
  /** token 令牌 */
  token: string
  /** 头像 */
  avatar: string
  /** 手机号 */
  mobile: string
  /** 用户名 */
  account: string
  /** 用户id */
  id: string
}

// login登录register注册changeMobile更换手机号forgetPassword找回密码,bindMobile绑定三方登录
export type CodeType =
  | 'login'
  | 'register'
  | 'changeMobile'
  | 'forgetPassword'
  | 'bindMobile'
