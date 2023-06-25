<template>
<n-layout has-sider wh-full>
    <!-- 左侧menu内容 collapsed边栏是否折叠，collapsed-width折叠后的宽度，collapse-mode如果设定为 'width'，Sider 的内容宽度将会被实际改变-->
      <n-layout-sider bordered collapse-mode="width" :collapsed-width="64" :width="220" :native-scrollbar="false" :collapsed="appStore.collapsed">
       <SideBar/>
      </n-layout-sider>
      <article flex-col flex-1 overflow-hidden>
        <!-- 头部面包屑标签内容以及用户展示区域 -->
        <header flex items-center border-b border-b-solid bg-white px-15 bc-eee dark="bg-dark border-0" :style="`height: ${header.height}px`"  >
         <AppHeader/>
        </header>
        <!--可删除的tag标签  -->
        <section v-if="tagSetting.show" hidden border-b border-b-solid bc-eee sm:block dark:border-0>
        <AppTags :style="{ height: `${tags.height}px` }"/>
        </section>
        <!-- 内容模块 -->
        <section flex-1 bg-hex-f5f6fb dark:bg-hex-101014>
            <AppMain></AppMain>
        </section>
      </article>
    </n-layout>
</template>

<script setup>
import SideBar from './components/sidebar/index.vue'
import AppHeader from './components/header/index.vue'
import AppTags from './components/tags/index.vue'
import AppMain from './AppMain.vue'
import { useAppStore } from '@/store'
import { header,tags } from '~/settings' //引入定义的高度
import { tagSetting } from '@/hooks/useProjectSetting.js' //是否显示标签
const appStore = useAppStore()

</script>

<style lang="scss" scoped>
</style>
