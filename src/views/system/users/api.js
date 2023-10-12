
import { defAxios as request } from '@/utils'

export default {
  getUserList: (data = {}) => request.post('/private/users/userPage',data ), //用户列表
  updateUser: (data = {}) => request.post('/private/users/updateUser',data ), //修改用户信息
  getUserById: (params = {}) => request.get(`/private/users/getUser`,{params}), //当前用户信息
}
