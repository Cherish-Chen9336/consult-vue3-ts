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

// 查询参数
export type KnowledgeParams = {
  /**推荐类型 */
  type: KnowledgeType
  /**当前页 */
  current: number
  /**每页条数 */
  pageSize: number
}
