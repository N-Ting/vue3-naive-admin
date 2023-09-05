// 动态路由
import { useUserStore } from '@/store'
import { usePermissionStore } from '@/store/modules/permission'
import { NOT_FOUND_ROUTE } from '@/router/routes'
import { getToken, removeToken } from '@/utils'
import { toLogin } from '@/utils'

const WHITE_LIST = ['/login']
export function createPermissionGuard(router) {
  const userStore = useUserStore()
  const permissionStore = usePermissionStore()
  router.beforeEach(async (to, from, next) => {
    const token = getToken()
    if (token) {
      if (to.path === '/login') {
        next({ path: '/' })
      } else {
        if (userStore.userId) {
          // 已经拿到用户信息
          next()
        } else {
          await userStore.getUserInfo().catch((error) => {
            removeToken()
            toLogin()
            $message.error(error.message || '获取用户信息失败！')
            return
          })
          const accessRoutes = permissionStore.generateRoutes(userStore.role)
          accessRoutes.forEach((route) => {
            !router.hasRoute(route.name) && router.addRoute(route)
          })
          router.addRoute(NOT_FOUND_ROUTE)
          next({ ...to, replace: true })
        }
      }
    } else {
      if (WHITE_LIST.includes(to.path)) {
        next()
      } else {
        next({ path: '/login' })
      }
    }
  })
}
