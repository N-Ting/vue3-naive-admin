<template>
    <AppPage>
      <header v-if="showHeader" mb-15 min-h-45 flex items-center justify-between px-15>
          <slot name="action" />
      </header>
      <n-card flex-1 rounded-10>
        <slot />
      </n-card>
    </AppPage>
  </template>
  
  <script setup>
  defineProps({
    showHeader: {
      type: Boolean,
      default: false,
    },
  })
  </script>
  