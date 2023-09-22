const ACTIONS = {
  view: '查看',
  edit: '编辑',
  add: '新增',
}
export default function ({ name, doCreate, doView, doDelete, doUpdate, refresh }) {
  const modalVisible = ref(false) //弹框是否打开
  const modalAction = ref('') // 当前状态
  const modalTitle = computed(() => ACTIONS[modalAction.value] + name) //标题
  const modalLoading = ref(false) //loading是否开启
  const modalFormRef = ref(null) //表单ref
  const modalForm = ref({}) //表单数据
  // 获取信息
  async function getPostById(id) {
    const { data } = await doView({ id })
    modalForm.value = data
  }
  /** 保存 */
  function handleSave() {
    console.log(modalFormRef.value)
    if (!['edit', 'add'].includes(modalAction.value)) {
      modalVisible.value = false
      return
    }
    modalFormRef.value?.validate(async (err) => {
      if (err) return
      const actions = {
        add: {
          api: () => doCreate(modalForm.value),
          cb: () => $message.success('新增成功'),
        },
        edit: {
          api: () => doUpdate(modalForm.value),
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

  return {
    modalVisible,
    modalAction,
    modalTitle,
    modalLoading,
    getPostById,
    handleSave,
    modalForm,
    modalFormRef,
  }
}
