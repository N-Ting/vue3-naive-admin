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
import { useFORM } from '@/composables'
// 获取企业的store
const unitStore = useUnitStore()
// // 弹框是否打开
// const modalVisible = ref(false)
// // 当前状态
// const modalAction = ref('')
// // 表单数据
// const modalForm = ref({})
// // loading状态
// const modalLoading = ref(false)
// // 表单ref
// const modalFormRef = ref(null)
// 角色类型的options
const generalOptions = computed(() =>
  unitStore.unitRole.map((v) => ({ label: v.roleName, value: v.id }))
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
// 保存企业信息
function handleSave() {
    if (!['edit', 'add'].includes(modalAction.value)) {
      modalVisible.value = false
      return
    }
    modalFormRef.value?.validate(async (err) => {
      if (err) return
      const actions = {
        add: {
          api: () => api.addUnitPost(modalForm.value),
          cb: () => $message.success('新增成功'),
        },
        edit: {
          api: () => api.addUnitPost(modalForm.value),
          cb: () => $message.success('编辑成功'),
        },
      }
      const action = actions[modalAction.value]

      try {
        modalLoading.value = true
        const data = await action.api()
        action.cb()
        modalLoading.value = modalVisible.value = false
        data && refresh(data)
      } catch (error) {
        modalLoading.value = false
      }
    })
}

const {
  modalVisible,
  modalAction,
  modalTitle,
  modalLoading,
  handleAdd,
  handleDelete,
  handleEdit,
  handleView,
  handleSave,
  modalForm,
  modalFormRef,
} = useFORM({
  name: '文章',
  initForm: { author: '大脸怪' },
  doCreate: api.addPost,
  doDelete: api.deletePost,
  doUpdate: api.updatePost,
  refresh: () => $table.value?.handleSearch(),
})

// 抛出方法，让父级可以使用
defineExpose({
  showVisible,
})
</script>

<style lang="scss" scoped></style>
