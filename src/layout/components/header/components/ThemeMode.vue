<template>
    <n-icon cursor-pointer size="18" @click="toggleDark">
    <icon-mdi:moon-waning-crescent v-if="isDark" />
    <icon-mdi:white-balance-sunny v-else />
  </n-icon>
</template>

<script setup>
import { useAppStore } from '@/store'
// useDark是否使用深色模式
import { useDark, useToggle } from '@vueuse/core'
const appStore = useAppStore()
const isDark = useDark()
const toggleDark = (()=>{
    appStore.toggleDark()
    useToggle(isDark) 
})

</script>

<style lang="scss" scoped>
</style>
