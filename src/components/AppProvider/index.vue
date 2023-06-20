<template>
  <!-- n-config-provider 调整主题 -->
  <!-- Locale 对后代组件生效的语言对象 -->
  <!--theme对后代组件生效的主题对象, 从 naive-ui 导入的 darkTheme 来设定暗色主题,为 undefined 时会继承上级 n-config-provider-->
    <n-config-provider  wh-full  :locale="zhCN"
    :date-locale="dateZhCN" :theme="appStore.isDark?darkTheme:undefined" :theme-overrides="naiveThemeOverrides">
      <!-- 加载条 Loading Bar -->
      <n-loading-bar-provider>
        <!-- 对话框 Dialog -->
      <n-dialog-provider>
        <!-- 通知 Notification -->
        <n-notification-provider>
          <n-message-provider>
            <slot></slot>
            <NaiveProviderContent />
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
    </n-config-provider>
  </template>
  
  <script setup>
import { computed, defineComponent, h } from 'vue'
import { useLoadingBar, useDialog, useMessage, useNotification,darkTheme,zhCN,
  dateZhCN, } from 'naive-ui'
import { useCssVar } from '@vueuse/core' //css变量
import { kebabCase } from 'lodash-es' //短横线命名方式。
import { setupMessage, setupDialog } from '@/utils'
// import { naiveThemeOverrides } from '~/settings'
import { useAppStore } from '@/store'
const appStore = useAppStore()
console.log(appStore.appTheme);
const naiveThemeOverrides = computed(()=>{
  return {
    common:{
      primaryColor: appStore.appTheme,
      primaryColorSuppl:appStore.appTheme,
    }
  }
})

// 处理css变量
function setupCssVar() {
  const common = naiveThemeOverrides.value.common
  for (const key in common) {
    useCssVar(`--${kebabCase(key)}`, document.documentElement).value = common[key] || ''
    if (key === 'primaryColor') window.localStorage.setItem('__THEME_COLOR__', common[key] || '')
  }
}

  // 挂载naive组件的方法至window, 以便在全局使用
function setupNaiveTools() {
  window.$loadingBar = useLoadingBar()
  window.$notification = useNotification()

  window.$message = setupMessage(useMessage())
  window.$dialog = setupDialog(useDialog())
}

const NaiveProviderContent = defineComponent({
  setup() {
    setupCssVar()
    setupNaiveTools()
  },
  render() {
    return h('div')
  },
})
  </script>
  