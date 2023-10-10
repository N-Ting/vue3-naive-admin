

import { defineStore } from 'pinia'
import { sStorage } from '@/utils'
export const useUnitStore = defineStore('unit', {
  state() {
    return {
     unitRole:[],//企业角色
     userRole:[],//用户角色
    }
  },
  getters: {
  },
  actions: {
    // 存unitRole
    setUnitRole(role) {
      this.unitRole = role
      // sStorage.set('unitRole', role)
    },

    setUserRole(role) {
      this.userRole = role
      // sStorage.set('userRole', role)
    },
  },
})
