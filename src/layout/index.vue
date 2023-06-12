<template>
<n-layout has-sider wh-full>
    <!-- 左侧menu内容 -->
      <n-layout-sider bordered collapse-mode="width" :collapsed-width="64" :width="220" :native-scrollbar="false">
       <SideBar/>
      </n-layout-sider>
      <article flex-col flex-1 overflow-hidden>
        <!-- 头部面包屑标签内容以及用户展示区域 -->
        <header flex items-center border-b border-b-solid bg-white px-15 bc-eee dark="bg-dark border-0" style="height: 60px;"  ></header>
        <!--可删除的tag标签  -->
        <section hidden border-b border-b-solid bc-eee sm:block dark:border-0 style="height: 50px;"></section>
        <!-- 内容模块 -->
        <section flex-1 bg-hex-f5f6fb >
            <AppMain></AppMain>
            <!-- <section p-15>
                <div flex-1>
                    <n-card rounded-10>
                    卡片内容
                    </n-card>
                    <n-card title="项目" :segmented="true" size="small" rounded-10 mt-15>
                    卡片内容
                    </n-card>
                </div>

            </section> -->
            
        </section>
      </article>
    </n-layout>
</template>

<script setup>
import SideBar from './components/sidebar/index.vue'
import AppMain from './AppMain.vue'

</script>

<style lang="scss" scoped>
</style>
