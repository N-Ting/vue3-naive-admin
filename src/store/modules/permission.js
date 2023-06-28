import { defineStore } from 'pinia'
import { asyncRoutes, basicRoutes } from '@/router/routes'

// 是否有权限
function hasPermission(route, role) {
  // * 不需要权限直接返回true
  if (!route.meta?.requireAuth) return true

  const routeRole = route.meta?.role ? route.meta.role : []

  // * 登录用户没有角色或者路由没有设置角色判定为没有权限
  if (!role.length || !routeRole.length) return false

  // * 路由指定的角色包含任一登录用户角色则判定有权限
  return role.some((item) => routeRole.includes(item))
}
// 过滤没有权限的路由
function filterAsyncRoutes(routes = [], role) {
  const ret = []
  routes.forEach((route) => {
    console.log(hasPermission(route, role));
    if (hasPermission(route, role)) {
      const curRoute = {
        ...route,
        children: [],
      }
      // 判断子级路由是否有权限
      if (route.children && route.children.length) {
        curRoute.children = filterAsyncRoutes(route.children, role)
      } else {
        // Reflect.deleteProperty()方法用于删除对象上的属性，它返回一个布尔值
        Reflect.deleteProperty(curRoute, 'children')
      }
      ret.push(curRoute)
    }
  })
  return ret
}

// 用户权限
export const usePermissionStore = defineStore('permission', {
  state() {
    return {
      accessRoutes: [],
    }
  },
  getters: {
    routes() {
      return basicRoutes.concat(this.accessRoutes)
    },
    menus() {
      return this.routes.filter((route) => route.name && !route.isHidden)
    },
  },
  actions: {
    // 产生的路由 role为路由上的权限用户
    generateRoutes(role = []) {
      const accessRoutes = filterAsyncRoutes(asyncRoutes, role)
      this.accessRoutes = accessRoutes
      return accessRoutes
    },
    resetPermission() {
      this.$reset()
    },
  },
})
