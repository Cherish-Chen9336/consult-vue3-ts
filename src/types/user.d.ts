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

// 个人信息
type OmitUser = Omit<User, 'token'>

export type UserInfo = OmitUser & {
  /**关注数量 */
  likeNumber: number
  /**收藏数量 */
  collectionNumber: number
  /**我的总积分 */
  score: number
  /**优惠券数量 */
  couponNumber: number
  /**订单信息 */
  orderInfo: {
    /**待付款 */
    paidNumber: number
    /**待发货 */
    receivedNumber: number
    /**待收货 */
    shippedNumber: number
    /**已完成 */
    finishedNumber: number
  }
}
