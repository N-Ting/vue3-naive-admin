<template>
  <CrudDrawer
    v-model:visible="drawerVisible"
    :title="drawerTitle"
    :loading="drawerLoading"
    :show-footer="drawerAction !== 'view'"
    @on-save="handleSave"
  ></CrudDrawer>
</template>

<script setup>
import api from './api';
import { useDrawer } from '@/composables'
function showVisible(id) {
  drawerVisible.value = true
  placement.value = 'right'
    const data = {
        unitId:id
    }
    getUnitDepart(data)
}

const {
  drawerVisible,
  drawerAction,
  drawerTitle,
  drawerLoading,
  placement,
  getUnitDepart,
  handleSave,
  modalForm,
  modalFormRef,
} = useDrawer({
  name: '部门信息',
  doUnitDepart: api.getUnitDepart,
  doCreate: api.addUnitPost,
  doDelete: api.deletePost,
  doUpdate: api.addUnitPost,
  refresh: () => $table.value?.handleSearch(),
})

// // 抛出方法，让父级可以使用
defineExpose({
    showVisible,
})
</script>

<style lang="scss" scoped></style>
