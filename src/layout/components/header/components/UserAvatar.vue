<template>
    <n-dropdown trigger="hover" :options="options" @select="handleSelect">
      <div flex cursor-pointer items-center>
        <!-- 头像 -->
        <img src="https://assets.qszone.com/images/avatar.jpg" mr10 h-35 w-35 rounded-full />
        <span>{{ userStore.loginName }}</span>
         </div>
      </n-dropdown>
</template>

<script setup>
import {useUserStore} from '@/store'
import { renderIcon } from '@/utils'
// 用户信息
const userStore = useUserStore()

const options = [
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon('mdi:exit-to-app', { size: '14px' }),
  },
]
function handleSelect(key) {
    if (key === 'logout') {
    $dialog.confirm({
      title: '提示',
      type: 'info',
      content: '确认退出？',
      confirm() {
        userStore.logout()
        $message.success('已退出登录')
      },
    })
  } 
}
</script>

<style lang="scss" scoped>
</style>
