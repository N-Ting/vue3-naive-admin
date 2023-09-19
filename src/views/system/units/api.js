// 登录接口
import { defAxios as request } from '@/utils'

export default {
  getPosts: (data = {}) => request.post('/private/units/pageList',data ),
  getPostById: (id) => request.get(`/post/${id}`),
  addPost: (data) => request.post('/post', data),
  updatePost: (data) => request.put(`/post/${data.id}`, data),
  deletePost: (id) => request.delete(`/post/${id}`),
  getUnitRole:(data = {}) => request.post(`/private/roles/unitRoleSelect`,data), //获取所有的企业角色
  getUnitRoleId: (params = {}) => request.get(`/private/roles/getUnitRoles`,{params}), //通过roleId获取企业角色
  getUnitById: (params = {}) => request.get(`/private/units/unitGet`,{params}),
}
