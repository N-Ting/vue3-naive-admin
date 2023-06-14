<template>
    <!-- 面包屑 -->
    <n-breadcrumb>
    <n-breadcrumb-item v-for="item in route.matched.filter((item)=>!!item.meta?.title)" :key="item.path" @click="handleMenuSelect(item.path)">
      <component :is="getIcon(item.meta)"/>
      {{ item.meta.title }}
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script setup>
import { renderCustomIcon, renderIcon } from '@/utils' //处理图标
// 路由
const router = useRouter()
const route = useRoute()

// 跳转路径页面
function handleMenuSelect(path) {
    // 当路径没有改变时
    if (path === route.path) return 
    router.push(path)
}

// 获取图标
function getIcon(meta) {
    if (meta?.customIcon) return renderCustomIcon(meta.customIcon, { size: 18 })
    if (meta?.icon) return renderIcon(meta.icon, { size: 18 })
    return null
}
</script>

<style lang="scss" scoped>
</style>
