export default function ({ name, doCreate, doDelete, doUpdate, refresh }) {
  const drawerVisible = ref(false) //弹框是否打开
  const drawerAction = ref('') // 当前状态,控制保存按钮是否显示
  const drawerTitle = computed(() => name) //标题
  const drawerLoading = ref(false) //loading是否开启
  const placement = ref('right') //抽屉展示的位置
  const treeSelectedKeys = ref('')
  const $form =  ref(null)

  // 当前树形数据选中
  function handleSelectedKeysChange(selectedKeys) {
    $form.value.getFormData(selectedKeys.join(','))
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
          cb: () => $message.success('保存成功'),
        },
        //   edit: {
        //     api: () => doUpdate(modalForm.value),
        //     cb: () => $message.success('编辑成功'),
        //   },
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
    drawerVisible,
    drawerAction,
    drawerTitle,
    drawerLoading,
    placement,
    handleSave,
    handleSelectedKeysChange,
    $form,
  }
}
