<template>
  <div flex items-center>
    <!-- 是否收缩 -->
    <MenuCollapse />
    <!-- 面包屑 -->
    <BreadCrumb ml-15 hidden sm:block/>
  </div>
  <div ml-auto flex items-center>
    <!-- 切换暗黑模式 -->
    <ThemeMode />
    <!-- github地址 -->
    <GithubSite />
    <!-- 全屏 -->
    <FullScreen/>
    <!-- 当前登录人信息 -->
    <UserAvatar/>
  </div>
</template>

<script setup>
import MenuCollapse from './components/MenuCollapse.vue';
import BreadCrumb from './components/breadcrumb.vue';
import ThemeMode from './components/ThemeMode.vue';
import GithubSite from './components/GithubSite.vue';
import FullScreen from './components/FullScreen.vue';
import UserAvatar from './components/UserAvatar.vue'
</script>

<style lang="scss" scoped>
</style>
