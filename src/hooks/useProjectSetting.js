// 项目中配置Switch的，来控制是否显示系统中的显示

import { computed } from 'vue'
import { useAppStore } from "@/store";
const appStore = useAppStore()
//计算面包屑是否显示
export const crumbsSetting = computed(()=> {
    return appStore.crumbsSetting
})
// 计算大屏是否展示
export const screenSetting = computed(()=> {
    return appStore.screenSetting
})
// 计算标签是否展示
export const tagSetting = computed(()=> {
    return appStore.tagSetting
})
// 计算禁用动画
export const isPageAnimate = computed(()=> {
    return appStore.isPageAnimate
})
// 计算 路由动画类型
export const pageAnimateType = computed(()=> {
    return appStore.pageAnimateType
})