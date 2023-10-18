<template>
  <div>
    <n-form
      ref="modalFormRef"
      :label-placement="labelPlacement"
      :label-align="labelAlign"
      :label-width="labelWidth"
      :require-mark-placement="markPlacement"
      :model="modalForm"
      :disabled="disabled"
    >
      <slot name="left" />
      <FormItem :formData="formData" :modalForm="modalForm" :cols="cols" />
      <slot />
    </n-form>
  </div>
</template>

<script setup>
const props = defineProps({
  /* 表单label宽度 */
  labelWidth: {
    type: Number,
    default: '110',
  },
  /* 表单禁用状态 */
  disabled: {
    type: Boolean,
    default: false,
  },
  /* 标签显示的位置*/
  labelPlacement: {
    type: String,
    default: 'left',
  },
  /* 标签的文本对齐方式 */
  labelAlign: {
    type: String,
    default: 'right',
  },
  /* 必填星号的位置 */
  markPlacement: {
    type: String,
    default: 'left',
  },
  /* 当前所要显示的表单字段 */
  formData: {
    type: Array,
    default: [],
  },
  /* 状态 */
  formAction: {
    type: String,
    default: 'add',
  },
  /* 获取详情的api */
  getFormData: {
    type: Function,
    required: true,
  },
  cols: {
    type: Number,
    default: 1,
  },
})
const modalForm = ref({
  // sort: null,
})
const modalFormRef = ref(null) //表单ref
const modalData = ref({})
/* 获取表单信息 */
async function getFormData(id) {
  const { data } = await props.getFormData({ id })
  modalForm.value = data
  modalData.value = data
}

/* 清空表单 item,item1所需要改变参数的id名*/
function clearForm(item, item1) {
  props.formData.map((item) => {
    modalForm.value[item.value] = ''
  })
  modalForm.value[item] = modalData.value.id
  modalForm.value[item1] = modalData.value[item1]
}

/** 保存 */
function handleSave(doCreate, doUpdate, loading, modalVisible, refresh) {
  console.log(props.formAction)
  if (!['edit', 'add'].includes(props.formAction)) {
    modalVisible.value = false
    return
  }
  modalFormRef.value?.validate(async (err) => {
    if (err) return
    const actions = {
      add: {
        api: () => doCreate(modalForm.value),
        cb: () => $message.success('保存成功'),
      },
      edit: {
        api: () => doUpdate(modalForm.value),
        cb: () => $message.success('编辑成功'),
      },
    }
    const action = actions[props.formAction]

    try {
      loading.value = true
      const data = await action.api()
      action.cb()
      loading.value = false
      modalVisible.value = false
      data && refresh()
    } catch (error) {
      loading.value = false
    }
  })
}
// 抛出方法，让父级可以使用
defineExpose({
  getFormData,
  handleSave,
  clearForm,
})
</script>

<style lang="scss" scoped></style>
