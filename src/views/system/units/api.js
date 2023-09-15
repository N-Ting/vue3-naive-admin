// 登录接口
import { defAxios as request } from '@/utils'

export default {
  getPosts: (data = {}) => request.post('/private/units/pageList',data ),
  getPostById: (id) => request.get(`/post/${id}`),
  addPost: (data) => request.post('/post', data),
  updatePost: (data) => request.put(`/post/${data.id}`, data),
  deletePost: (id) => request.delete(`/post/${id}`),
  getUnitRole: (params = {}) => request.get(`/private/roles/getUnitRoles`,{params}), //获取企业角色
}
