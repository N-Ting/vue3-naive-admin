import { isNullOrWhitespace } from '@/utils'
const ACTIONS = {
  view: '查看',
  edit: '编辑',
  add: '新增',
}
export default function ({ name,doCreate,doDelete, doUpdate, refresh }) {
  const modalVisible = ref(false)
  const modalAction = ref('')
  const modalTitle = computed(() => ACTIONS[modalAction.value] + name)
  const modalLoading = ref(false)
  const modalFormRef = ref(null)
  const modalForm = ref({})
  const id = ref('')
  /**  */
  // function handleAdd() {
  //   modalAction.value = 'add'
  //   modalVisible.value = true
  //   modalForm.value = {}
  // }

  /** */
  // function handleEdit(row) {
  //   modalAction.value = 'edit'
  //   modalVisible.value = true
  //   modalForm.value = { ...row }
  // }

  /** 查看,新增,修改  */
  async function handleView(type,id) {
    modalAction.value = type
    modalVisible.value = true
    this.id = id
  }

  // 获取信息
 async function getPostById(id) {
  console.log(doEdit);
    const { data } = await doEdit({ id })
    modalForm.value = data
  }

  /** 保存 */
  function handleSave() {
    console.log(modalAction.value);
    // if (!['edit','add'].includes(modalAction.value)) {
    //   modalVisible.value = false
    //   return
    // }
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

  /** 删除 */
  function handleDelete(id, confirmOptions) {
    if (isNullOrWhitespace(id)) return
    $dialog.confirm({
      content: '确定删除？',
      async confirm() {
        try {
          modalLoading.value = true
          const data = await doDelete(id)
          $message.success('删除成功')
          modalLoading.value = false
          refresh(data)
        } catch (error) {
          modalLoading.value = false
        }
      },
      ...confirmOptions,
    })
  }

  return {
    modalVisible,
    modalAction,
    modalTitle,
    modalLoading,
    // handleAdd,
    // handleDelete,
    // handleEdit,
    handleView,
    handleSave,
    modalForm,
    modalFormRef,
  }
}
