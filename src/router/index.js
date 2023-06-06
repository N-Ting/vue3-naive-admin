import { createRouter, createWebHashHistory } from 'vue-router'
import { basicRoutes as routes,EMPTY_ROUTE, NOT_FOUND_ROUTE} from './routes'
import { setupRouterGuard } from './guard'
// import { getToken, isNullOrWhitespace } from '@/utils'
// import { useUserStore, usePermissionStore } from '@/store'
export const router = createRouter({
  history: createWebHashHistory('/'),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export function setupRouter(app) {
  app.use(router)
  setupRouterGuard(router)
}
