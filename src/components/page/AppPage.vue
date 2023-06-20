<template>
    <!-- 带有动画效果的内容区域 -->
    <!-- transition内置动画标签 name 属性：用于自动生成 CSS 动画类名
         in-out：新元素先进行过渡，完成之后当前元素过渡离开。
         out-in：当前元素先进行过渡，完成之后新元素过渡进入。 -->
    <transition name="fade-slide" mode="out-in" appear>
        <section cus-scroll-y  p-15>
            <slot></slot>
        </section>
    </transition>
</template>

<script setup>

</script>

<style lang="scss" scoped>
</style>
