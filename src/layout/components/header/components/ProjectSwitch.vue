<template>
  <div>
    <div flex flex-wrap justify-between pb-12 pt-12>
            <div font-14>显示面包屑导航</div>
            <div>
                <n-switch v-model:value="appStore.crumbsSetting.show"  />
            </div>
        </div>
        <div flex flex-wrap justify-between pb-12 pt-12>
            <div font-14>显示面包屑显示图标</div>
            <div>
                <n-switch v-model:value="appStore.crumbsSetting.showIcon"  />
            </div>
        </div>
        <div flex flex-wrap justify-between pb-12 pt-12>
            <div font-14>显示全屏图标</div>
            <div>
                <n-switch v-model:value="appStore.screenSetting.show"  />
            </div>
        </div>
        <div flex flex-wrap justify-between pb-12 pt-12>
            <div font-14>显示多页签</div>
            <div>
                <n-switch v-model:value="appStore.tagSetting.show"  />
            </div>
        </div>
  </div>
</template>

<script setup>
import { useAppStore } from '@/store';
const appStore = useAppStore()

</script>

<style lang="scss" scoped>
</style>
