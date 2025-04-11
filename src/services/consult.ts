import type {
  DoctorPage,
  followType,
  KnowledgePage,
  KnowledgeParams,
  PageParams
} from '@/types/consult'
import { request } from '@/utils/request'

// 获取首页文章列表
export const getKnowledgePage = (params: KnowledgeParams) =>
  request<KnowledgePage>('/patient/home/knowledge', 'GET', params)

// 获取关注医生信息
export const getDoctorPage = (params: PageParams) =>
  request<DoctorPage>('/home/page/doc', 'GET', params)

// 关注- 取消关注
export const followOrUnfollow = (type: followType, id: string) =>
  request('/like', 'POST', { type, id })
