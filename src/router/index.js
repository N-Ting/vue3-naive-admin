/* createWebHistory种基于浏览器 history API 的路由模式，不会在url中添加任何特殊字符如 /home、/about
   createWebHashHistory一种基于浏览器 URL 的 hash 路由模式例如：/#/home、/#/about
 */
import { createRouter, createWebHashHistory,createWebHistory } from 'vue-router'
import { basicRoutes as routes,EMPTY_ROUTE, NOT_FOUND_ROUTE} from './routes'
import { setupRouterGuard } from './guard'
import { getToken, isNullOrWhitespace } from '@/utils'
import { useUserStore, usePermissionStore } from '@/store'

const isHash = import.meta.env.VITE_USE_HASH === 'true'
export const router = createRouter({
  history:  isHash ? createWebHashHistory('/') : createWebHistory('/'),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export async function setupRouter(app) {
  await addDynamicRoutes()
  setupRouterGuard(router)
  app.use(router)
  
}

//重置路由
export async function resetRouter() {
  const basicRouteNames = getRouteNames(basicRoutes)
  router.getRoutes().forEach((route) => {
    const name = route.name
    if (!basicRouteNames.includes(name)) {
      router.removeRoute(name)
    }
  })
}

// 添加动态路由
export async function addDynamicRoutes() {
  const token = getToken()
  // 没有token情况
  if (isNullOrWhitespace(token)) {
    router.addRoute(EMPTY_ROUTE)
    return
  }
  // 有token的情况
  try {
    const userStore = useUserStore()
    const permissionStore = usePermissionStore()
    !userStore.userId && (await userStore.getUserInfo())
    const accessRoutes = permissionStore.generateRoutes(userStore.role)
    accessRoutes.forEach((route) => {
      !router.hasRoute(route.name) && router.addRoute(route)
    })
    router.hasRoute(EMPTY_ROUTE.name) && router.removeRoute(EMPTY_ROUTE.name)
    router.addRoute(NOT_FOUND_ROUTE)
  } catch (error) {
    console.error(error)
  }
}

// 导出获取路由名称
export function getRouteNames(routes) {
  return routes.map((route) => getRouteName(route)).flat(1)
}

// 获取路由名称
function getRouteName(route) {
  const names = [route.name]
  if (route.children && route.children.length) {
    names.push(...route.children.map((item) => getRouteName(item)).flat(1))
  }
  return names
}