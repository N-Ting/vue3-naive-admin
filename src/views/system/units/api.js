// 登录接口
import { defAxios as request } from '@/utils'

export default {
  getPosts: (data = {}) => request.post('/private/units/pageList',data ), //获取企业列表
  addUnitPost: (data) => request.post('/private/units/unitUpdate', data),  //修改企业信息
  getUnitById: (params = {}) => request.get(`/private/units/unitGet`,{params}), //获取企业信息
  getUnitDepart:(data = {})=>request.post(`/api/private/depts/treeList`,data), //获取部门信息
  getUnitRole:(data = {}) => request.post(`/private/roles/unitRoleSelect`,data), //获取所有的企业角色
  getUnitRoleId: (params = {}) => request.get(`/private/roles/getUnitRoles`,{params}), //通过roleId获取企业角色
  updateUnitRole: (data) => request.post('/private/roles/updateUnitRoles', data), //修改企业角色信息
}
