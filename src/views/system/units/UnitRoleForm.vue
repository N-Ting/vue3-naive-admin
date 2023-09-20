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
        label="角色类型"
        path="id"
        :rule="{
          required: true,
          message: '请输入角色类型',
          trigger: ['input', 'blur'],
        }"
      >
        <n-select
          v-model:value="modalForm.id"
          placeholder="请输入角色类型"
          :options="generalOptions"
        />
      </n-form-item>
      <n-form-item
        label="角色编码"
        path="roleCode"
        :rule="{
          required: true,
          message: '请输入角色编码',
          trigger: ['input', 'blur'],
        }"
      >
        <n-select
          v-model:value="modalForm.roleCode"
          placeholder="请输入角色编码"
          :options="roleCodeList"
        />
      </n-form-item>
      <n-form-item
        label="说明"
        path="remark"
        :rule="{
          required: true,
          message: '请输入说明',
          trigger: ['input', 'blur'],
        }"
      >
        <n-input
          v-model:value="modalForm.remark"
          placeholder="请输入说明"
          type="textarea"
          :autosize="{
            minRows: 3,
            maxRows: 5,
          }"
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
// 角色编码的options
const roleCodeList = computed(() =>
  unitStore.unitRole.map((v) => ({ label: v.roleCode, value: v.roleCode }))
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
  name: '企业角色',
  doCreate: api.updateUnitRole,
  doView: api.getUnitRoleId,
  doDelete: api.deletePost,
  doUpdate: api.updateUnitRole,
  refresh: () => $table.value?.handleSearch(),
})
// 抛出方法，让父级可以使用
defineExpose({
  showVisible,
})
</script>

<style lang="scss" scoped></style>
