// 文章信息类型
export type Knowledge = {
  /**id */
  id: string
  /**文章标题 */
  title: string
  /** 封面地址*/
  coverUrl: string[]
  /**关联话题 */
  topics: string[]
  /**收藏数量 */
  collectionNumber: number
  /**评论数量 */
  commentNumber: number
  /**创建人姓名 */
  creatorName: string
  /**创建人头像 */
  creatorAvatar: string
  /**创建人医院 */
  creatorHospatalName: string
  /**创建人科室 */
  creatorDep: string
  /**创建人职称 */
  creatorTitles: string
  /**是否关注0未关注1关注 */
  likeFlag: 0 | 1
  /**内容详情 */
  content: string
  /**创建人 id */
  creatorId: string
}

// 文章列表
export type KnowledgeList = Knowledge[]

// 文章列表带分页
export type KnowledgePage = {
  /**总页数 */
  pageTotal: number
  /**总条数 */
  total: number
  rows: KnowledgeList
}

// 查询参数类型  recommend推荐，fatReduction减脂，food健康饮食like关注医生页面文章
export type KnowledgeType = 'recommend' | 'fatReduction' | 'food' | 'like'

// 通用查询参数数据
export type PageParams = {
  /**当前页 */
  current: number
  /**每页条数 */
  pageSize: number
}

// 查询参数
export type KnowledgeParams = PageParams & {
  /**推荐类型 */
  type: KnowledgeType
}

// 医生卡片返回数据
export type Doctor = {
  /**医生id */
  id: string
  /**医生姓名 */
  name: string
  /**医生头像 */
  avatar: string
  /**医院名称 */
  hospitalName: string
  /**医院等级-名称简写 */
  gradeName: string
  /**科室名称*/
  depName: string
  /**职称 */
  positionalTitles: string
  /**是否关注 1已关注0未关注 */
  likeFlag: 1 | 0
  /**接诊费用 */
  serviceFee: number
  /**评分 */
  score: number
  /**方向 */
  major: string
}

// 医生列表
export type DoctorList = Doctor[]

// 医生分页
export type DoctorPage = {
  /**总页数 */
  pageTotal: number
  /**总条数 */
  total: number
  /**列表数据 */
  rows: DoctorList
}
