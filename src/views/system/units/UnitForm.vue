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
// 获取企业的store
const unitStore = useUnitStore()
// 弹框是否打开
const modalVisible = ref(false)
// 当前状态
const modalAction = ref('')
// 表单数据
const modalForm = ref({})
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
    getUnitById(id)
  }
}
// 获取企业信息
async function getUnitById(id) {
  const { data } = await api.getUnitById({ id })
  modalForm.value = data
}

// 抛出方法，让父级可以使用
defineExpose({
  showVisible,
})
</script>

<style lang="scss" scoped></style>
