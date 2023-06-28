import { defineStore } from 'pinia'
import { resetRouter } from '@/router'
import { getUser } from '@/api/user'
import { removeToken } from '@/utils'
import { toLogin } from '@/utils'
import { usePermissionStore } from '@/store'
export const useUserStore = defineStore('user', {
  state() {
    return {
      userInfo: {},
    }
  },
  getters: {
    userId() {
      // ?.当userInfo不存在时返回undefined，在引用为空(nullish ) (null 或者 undefined) 的情况下不会引起错误
      return this.userInfo?.id
    },
    name() {
      return this.userInfo?.name
    },
    avatar() {
      return this.userInfo?.avatar
    },
    role() {
      return this.userInfo?.role || []
    },
  },
  actions: {
    // 获取用户信息
    async getUserInfo() {
      try {
        const res = await getUser()
        if (res.code === 0) {
          const { id, name, avatar, role } = res.data
          this.userInfo = { id, name, avatar, role }
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
