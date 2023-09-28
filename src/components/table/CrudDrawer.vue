<!-- 抽屉组件 -->
<template>
   <n-drawer v-model:show="show" :width="width" :height="height" :placement="placement" >
    <n-drawer-content :title="title">
      <slot />
      <template  #footer>
      <footer flex justify-center>
        <slot name="footer">
          <n-button @click="show = false">取消</n-button>
          <n-button v-if="showFooter" :loading="loading" ml-20 type="primary" @click="emit('onSave')">保存</n-button>
        </slot>
      </footer>
    </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup>
const props = defineProps({
  width: {
    type: String,
    default: '750px',
  },
  height:{
    type: String,
    default: '100%',
  },
  title: {
    type: String,
    default: '',
  },
  visible: {
    type: Boolean,
    required: true,
  },
  placement: {
    type: Boolean,
    required: true,
  },
  showFooter: {
    type: Boolean,
    default: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:visible', 'onSave'])
const show = computed({
  get() {
    return props.visible
  },
  set(v) {
    emit('update:visible', v)
  },
})

</script>

<style lang="scss" scoped>
</style>
