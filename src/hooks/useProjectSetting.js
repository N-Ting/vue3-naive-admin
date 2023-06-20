// 项目中配置Switch的，来控制是否显示系统中的显示

import { computed } from 'vue'
import { useAppStore } from "@/store";
const appStore = useAppStore()

export const crumbsSetting = computed(()=> {
    return appStore.crumbsSetting
})
export const screenSetting = computed(()=> {
    return appStore.screenSetting
})
export const tagSetting = computed(()=> {
    return appStore.tagSetting
})