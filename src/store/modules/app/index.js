import {nextTick} from 'vue'
import { defineStore } from 'pinia'
import { useDark } from '@vueuse/core'
import {appThemeList,switchList} from '~/settings'

const isDark = useDark()
export const useAppStore = defineStore('app', {
  state() {
    return {
      reloadFlag: true, 
      collapsed: false, //是否折叠,为true则表示折叠
      /** keepAlive路由的key，重新赋值可重置keepAlive */
      aliveKeys: {},
      isDrawer:false,//是否开启抽屉
      // placement:'right',
      isDark,
      appTheme:'#316C72FF', //系统主题色变量
      appThemeList,  //系统内置主题色列表
      switchList,
      //面包屑
      crumbsSetting: {
      //是否显示
      show: true,
      //显示图标
      showIcon: true,
      },
      screenSetting:{
        // 是否显示大屏
        show:true
      },
      tagSetting:{
        // 是否显示多页签
        show:true
      },
      // 禁用动画
      isPageAnimate:false,
      // 路由动画类型
      pageAnimateType:'fade-slide',
    }
  },
  getters:{
    //系统主题色的计算属性
    getAppThem(key,val){
      console.log(key,val);
      return this.appTheme
    },
    //系统主题色列表的计算属性
    getAppThemList(){
      return this.appThemeList
    },
    // 页面配置
    getSwitchList(){
      return this.switchList
    }
  },
  actions: {
    //重载页面
    async reloadPage() {
      $loadingBar.start()
      this.reloadFlag = false
      await nextTick()
      this.reloadFlag = true

      setTimeout(() => {
        document.documentElement.scrollTo({ left: 0, top: 0 })
        $loadingBar.finish()
      }, 100)
    },
    // 切换收缩
    switchCollapsed() { 
      this.collapsed = !this.collapsed
    },

    // 设置是否收缩
    setCollapsed(collapsed) {
      this.collapsed = collapsed
    },
    setAliveKeys(key, val) {
      this.aliveKeys[key] = val
    },

     /* 是否打开抽屉 */
    toggleDrawer(){
      this.isDrawer = !this.isDrawer
    },
    
    /* 设置抽屉 */
    setDrawer(drawer){
      this.isDrawer =drawer
    },

    /** 设置暗黑模式 */
    setDark(isDark) {
      this.isDark = isDark
    },
    /** 切换/关闭 暗黑模式 */
    toggleDark() {
      this.isDark = !this.isDark
    },
  },
})
