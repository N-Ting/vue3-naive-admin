<template>
    <!-- 收缩左侧菜单 -->
    <n-icon cursor-pointer size="20" @click="appStore.switchCollapsed">
        <!-- 收缩后的图标 -->
        <icon-mdi:format-indent-increase v-if="appStore.collapsed"></icon-mdi:format-indent-increase>
        <!-- 展开的图标 -->
        <icon-mdi:format-indent-decrease v-else></icon-mdi:format-indent-decrease>
  </n-icon>
</template>

<script setup>
import {useAppStore} from '@/store' //引入设置app的存储方法
const appStore = useAppStore()

</script>

<style lang="scss" scoped>
</style>
