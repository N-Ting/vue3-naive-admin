<template>
    <n-icon mr-20 cursor-pointer size="18" @click="handleLinkClick">
       <icon-mdi:github />
    </n-icon>
</template>

<script setup>
// 跳转到GitHub地址
function handleLinkClick() {
    window.open('https://github.com/N-Ting/vue3-naive-admin')
}
</script>

<style lang="scss" scoped>
</style>
