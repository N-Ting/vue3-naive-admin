<template>
  <CrudModal
    v-model:visible="modalVisible"
    :title="modalTitle"
    :loading="modalLoading"
    :show-footer="modalAction !== 'view'"
    @on-save="handleSave"
  >
    <n-form
      ref="modalFormRef"
      label-placement="left"
      label-align="left"
      :label-width="80"
      :model="modalForm"
      :disabled="modalAction === 'view'"
    >
      <n-form-item
        label="企业名称"
        path="unitName"
        :rule="{
          required: true,
          message: '请输入企业名称',
          trigger: ['input', 'blur'],
        }"
      > 
      <n-input
          v-model:value="modalForm.unitName"
          placeholder="请输入企业名称"
        />
      </n-form-item>
      <n-form-item
        label="统一信用代码"
        path="provinceCode"
        :rule="{
          required: true,
          message: '请输入统一信用代码',
          trigger: ['input', 'blur'],
        }"
      > 
      <n-input
          v-model:value="modalForm.provinceCode"
          placeholder="请输入统一信用代码"
        />
      </n-form-item>
      <n-form-item
        label="地址"
        path="unitAddress"
        :rule="{
          required: true,
          message: '请输入地址',
          trigger: ['input', 'blur'],
        }"
      > 
      <n-input
          v-model:value="modalForm.unitAddress"
          placeholder="请输入地址"
        />
      </n-form-item>
      <n-form-item
        label="角色类型"
        path="roleId"
        :rule="{
          required: true,
          message: '请输入角色类型',
          trigger: ['input', 'blur'],
        }"
      >
        <n-select
          v-model:value="modalForm.roleId"
          placeholder="请输入角色类型"
          :options="generalOptions"
        />
      </n-form-item>
    </n-form>
  </CrudModal>
</template>

<script setup>
import { useUnitStore } from '@/store'
import api from './api'
import { useFORM } from '@/composables'
// 获取企业的store
const unitStore = useUnitStore()
// 角色类型的options
const generalOptions = computed(() =>
  unitStore.unitRole.map((v) => ({ label: v.roleName, value: v.id }))
)
function showVisible(type, id) {
  modalAction.value = type
  modalVisible.value = true
  if (type != 'add') {
    getPostById(id)
  }
}
const {
  modalVisible,
  modalAction,
  modalTitle,
  modalLoading,
  getPostById,
  handleSave,
  modalForm,
  modalFormRef,
} = useFORM({
  name: '企业管理',
  initForm: { author: '大脸怪' },
  doCreate: api.addUnitPost,
  doView: api.getUnitById,
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
