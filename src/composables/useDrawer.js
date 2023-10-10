import { isNullOrWhitespace } from '@/utils'

export default function ({ name, doCreate, doUpdate, doDelete, refresh }) {
  const drawerVisible = ref(false) //弹框是否打开
  const drawerAction = ref('') // 当前状态,控制保存按钮是否显示以及调取的api
  const drawerTitle = computed(() => name) //标题
  const saveLoading = ref(false) //保存loading是否开启
  const placement = ref('right') //抽屉展示的位置
  const $form = ref(null) //form表单的ref
  const showForm = ref(false) //是否显示表单
  const addShow = ref(true) //是否显示新增下一级的按钮

  /** 保存 */
  function handleSave() {
    $form.value.handleSave(doCreate, doUpdate, saveLoading,refresh)
  }
  /** 删除 */
  function handleDelete(id) {
    if (isNullOrWhitespace(id)) return
    $dialog.confirm({
      content: '确定删除？',
      async confirm() {
        try {
          saveLoading.value = true
          const data = await doDelete({id})
          $message.success('删除成功')
          refresh()
          saveLoading.value = false
         
        } catch (error) {
          saveLoading.value = false
        }
      },
    })
  }
  return {
    drawerVisible,
    drawerAction,
    drawerTitle,
    placement,
    $form,
    showForm,
    saveLoading,
    addShow,
    handleSave,
    handleDelete,
  }
}
