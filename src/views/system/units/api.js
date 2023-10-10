
import { defAxios as request } from '@/utils'

export default {
  getPosts: (data = {}) => request.post('/private/units/pageList',data ), //获取企业列表
  addUnitPost: (data) => request.post('private/units/unitCreate', data),  //新增企业信息
  updateUnit:(data) => request.post('/private/units/unitUpdate', data),  //修改企业信息
  getUnitById: (params = {}) => request.get(`/private/units/unitGet`,{params}), //获取企业信息
  getUnitDepart:(data = {})=>request.post(`/private/depts/treeList`,data), //获取部门信息
  getUnitDepartById:(params = {})=>request.get(`/private/depts/deptGet`,{params}), //获取当前部门信息
  addUnitDepart:(data={})=>request.post('/private/depts/create', data),  //新增下一级--部门
  updateUnitDepart:(data={})=>request.post('/private/depts/deptUpdate', data),  //编辑部门信息--部门
  delUnitDepart:(data={})=>request.post('/private/depts/deptDelete', data),  //删除部门信息--部门
  getUnitMember:(data = {})=>request.post(`/private/users/userPersonlist`,data), //查询当前部门成员信息列表
  addUnitMember:(data = {})=>request.post(`/private/users/addPerson`,data), //新增部门成员信息
  getUnitMemberById:(params = {})=>request.get(`/private/users/findOne`,{params}), //查询当前成员信息
  updateUnitMember:(data = {})=>request.post(`/private/users/update`,data), //修改当前成员信息
  getUnitRole:(data = {}) => request.post(`/private/roles/unitRoleSelect`,data), //获取所有的企业角色
  getUnitRoleId: (params = {}) => request.get(`/private/roles/getUnitRoles`,{params}), //通过roleId获取企业角色
  updateUnitRole: (data = {}) => request.post('/private/roles/updateUnitRoles', data), //修改企业角色信息
  getUserRole:(data = {}) => request.post(`/private/roles/userRoleSelect`,data), //获取所有的用户角色
}
