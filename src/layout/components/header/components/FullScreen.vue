<template>
   <n-icon mr20 size="18" style="cursor: pointer" @click="toggle">
    <!-- 缩小 -->
    <icon-ant-design:fullscreen-exit-outlined v-if="isFullscreen" />
    <!-- 放大 -->
    <icon-ant-design:fullscreen-outlined v-else />
  </n-icon>
</template>

<script setup>
import { useFullscreen } from '@vueuse/core'
const { isFullscreen,toggle } = useFullscreen()
</script>

<style lang="scss" scoped>
</style>
