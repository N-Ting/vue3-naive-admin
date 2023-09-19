

import { defineStore } from 'pinia'
import { router } from '@/router'
import { sStorage } from '@/utils'
export const useUnitStore = defineStore('unit', {
  state() {
    return {
     unitRole:[],//企业角色
    }
  },
  getters: {
  },
  actions: {
    // 存unitRole
    setUnitRole(role) {
      this.unitRole = role
      sStorage.set('unitRole', role)
    },
  },
})
