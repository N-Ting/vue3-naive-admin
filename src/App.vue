<template>
  <AppProvider>
    <router-view v-slot="{ Component }">
      <!-- {{ Component }} -->
      <component :is="Component" />
    </router-view>
  </AppProvider>
</template>

<script setup>
import AppProvider from '@/components/AppProvider/index.vue'
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  .n-config-provider {
    height: inherit;
  }
}
</style>
