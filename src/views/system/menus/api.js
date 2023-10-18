
import { defAxios as request } from '@/utils'

export default {
  getMenusList: (data = {}) => request.post('/private/menus/list',data ), //获取菜单树形列表
  createMenus: (data = {}) => request.post('/private/menus/create',data ), //新增菜单
  getMenusById: (params = {}) => request.get(`/private/menus/findOne`,{params}), //获取菜单信息
  updateMenus: (data = {}) => request.post('/private/menus/update',data ), //修改菜单
  deleteMenus: (data = {}) => request.post('/private/menus/delete',data ), //删除菜单
}
