// 登录接口
import { defAxios as request } from '@/utils'

export default {
  getPosts: (params = {}) => request.post('/private/roles/unitUserPage',params ),
  getPostById: (id) => request.get(`/post/${id}`),
  addPost: (data) => request.post('/post', data),
  updatePost: (data) => request.put(`/post/${data.id}`, data),
  deletePost: (id) => request.delete(`/post/${id}`),
}
