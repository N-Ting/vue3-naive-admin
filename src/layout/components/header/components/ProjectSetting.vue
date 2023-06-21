<template>
    <!-- 项目的主题颜色，风格，按钮的设置 -->
  <n-tooltip trigger="hover">
    <template #trigger>
        <n-icon size="20" mr-20 @click="appStore.toggleDrawer">
              <!-- <SettingOutlined /> -->
              <icon-material-symbols:settings-outline-rounded></icon-material-symbols:settings-outline-rounded>
            </n-icon>
    </template>
     <span>项目设置</span>
  </n-tooltip>
  <!-- 项目设置 -->
  <n-drawer v-model:show="appStore.isDrawer" :width="deawer.width" :placement="placement">
    <n-drawer-content title="项目配置">
        <n-divider>系统主题</n-divider>
        <div flex justify-center>
            <n-tooltip trigger="hover">
               <template #trigger>
                   <!-- 切换暗黑模式 -->
                   <ThemeMode />
               </template>
               <span>{{ appStore.isDark?'深':'浅' }}色主题</span>
            </n-tooltip>
        </div>
        <n-divider>系统风格</n-divider>
        <div>
            <span mr10 b border-solid  bc-eee v-for="(item,i) in appThemeList" :key="i" :style="`background-color:${item}`" @click="toggleTheme(item)">
                <n-icon cursor-pointer size="18">
                    <icon-ic:outline-check color-white v-if="item === appStore.appTheme"/>
                </n-icon>
            </span>
        </div>
        <n-divider>界面显示</n-divider>
        <ProjectSwitch/>
        <n-divider>界面动画</n-divider>
        <div flex flex-wrap justify-between pb-12 pt12>
          <div font-14>禁用动画</div>
          <div>
            <n-switch v-model:value="appStore.isPageAnimate" />
          </div>
        </div>
        <div flex flex-wrap justify-between pb-12 pt12>
          <div font-14>动画类型</div>
          <div ml-50 flex-1>
            <n-select v-model:value="appStore.pageAnimateType" :options="animateOptions" />
          </div>
        </div>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup>
import { ref } from 'vue'
import { useAppStore } from '@/store'
import { deawer,appThemeList,animates as animateOptions } from '~/settings' 
import ThemeMode from './ThemeMode.vue';
import { useCssVar } from '@vueuse/core' //css变量
import { kebabCase } from 'lodash-es'
import ProjectSwitch from './ProjectSwitch.vue';
const placement = ref('right')
const appStore = useAppStore()
function toggleTheme(color) {
    // 改变store里存储的主题颜色
    appStore.appTheme = color
    // 通过useCssVar设置颜色，kebabCase（短横线）命名方式
    useCssVar(`--${kebabCase("primaryColor")}`, document.documentElement).value = appStore.appTheme || ''
    // 存储到本地中
    window.localStorage.setItem('__THEME_COLOR__', appStore.appTheme || '')
}
</script>

<style lang="scss" scoped>
</style>
