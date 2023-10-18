import { defineStore } from 'pinia'
import { resetRouter } from '@/router'
import { getUser } from '@/api/user'
import { removeToken,removeUserInfo } from '@/utils'
import { toLogin,getUserInfo} from '@/utils'
import { usePermissionStore } from '@/store'
export const useUserStore = defineStore('user', {
  state() {
    return {
      userInfo: {}, //用户信息
      menusList:[], //当前用户菜单权限
    }
  },
  getters: {
    userId() {
      // ?.当userInfo不存在时返回undefined，在引用为空(nullish ) (null 或者 undefined) 的情况下不会引起错误
      return this.userInfo?.id
    },
    name() {
      return this.userInfo?.loginName
    },
    avatar() {
      return this.userInfo?.avatar
    },
    role() {
      return this.menusList || []
    },
  },
  actions: {
    // 获取用户信息
    async getUserInfo() {
      try {
        const res = await getUser()
        if (res.code === 200) {
          const { userInfo,menus } = res.data
          this.userInfo = userInfo
          this.menusList = menus
          return Promise.resolve(res.data)
        } else {
          return Promise.reject(res)
        }
      } catch (error) {
        return Promise.reject(error)
      }
    },
    // 退出登录
    async logout() {
      const { resetPermission } = usePermissionStore()
      removeToken()
      removeUserInfo()
      resetPermission()
      resetRouter()
      this.userInfo = {}
      toLogin()
    },
    setUserInfo(userInfo = {}) {
      this.userInfo = { ...this.userInfo, ...userInfo }
    },
  },
})
