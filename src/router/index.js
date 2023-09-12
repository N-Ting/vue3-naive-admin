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
/*    history模式：createWebHistory  hash模式：createWebHashHistory()
  当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置 */
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
  const basicRouteNames = getRouteNames(routes)
  // router.getRoutes()：获取一个包含所有路由的数组
  router.getRoutes().forEach((route) => {
    const name = route.name
    // 如果基础路由中没有，就删除该路由
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
    // 获取user的store
    const userStore = useUserStore()
    // 获取权限的store
    const permissionStore = usePermissionStore()
    // 没有用户id，请求用户信息
    !userStore.userId && (await userStore.getUserInfo())
    // 将当前用户的role传给产生路由的方法
    const accessRoutes = permissionStore.generateRoutes(userStore.role)
    accessRoutes.forEach((route) => {
      debugger
      // 当前路由是否存在，不存在就添加动态路由
      !router.hasRoute(route.name) && router.addRoute(route)
    })
    // 存在EMPTY_ROUTE.name的路由，通过name删除
    router.hasRoute(EMPTY_ROUTE.name) && router.removeRoute(EMPTY_ROUTE.name)
    // 添加NOT_FOUND_ROUTE路由
    router.addRoute(NOT_FOUND_ROUTE)
  } catch (error) {
    console.error(error)
  }
}

// 导出获取路由名称
export function getRouteNames(routes) {
  debugger
  // flat() 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。
  return routes.map((route) => getRouteName(route)).flat(1)
}

// 获取路由名称
function getRouteName(route) {
  const names = [route.name]
  if (route.children && route.children.length) {
    names.push(...route.children.map((item) => getRouteName(item)).flat(1))
  }
  //例如name会是["404","LOGIN"]
  return names
}