import { isNullOrWhitespace } from '@/utils'

const ACTIONS = {
  view: '查看',
  edit: '修改',
  add: '新增',
}

export default function ({name,doCreate, doUpdate,  doDelete,refresh}) {
  const $table = ref(null)
  /** 表格数据，触发搜索的时候会更新这个值 */
  const tableData = ref([])
  /** QueryBar筛选参数（可选） */
  const queryItems = ref({ unitName: '' })
  /** 补充参数（可选） */
  const extraParams = ref({})
  /* form表单组件的ref */
  const $form = ref(null) 
  const modalVisible = ref(false) //弹框是否打开
  const modalAction = ref('') // 当前状态
  const modalTitle = computed(() => ACTIONS[modalAction.value] + name) //标题
  const modalLoading = ref(false) //loading是否开启
  //新增编辑查看
  function handleView(type, id) {
    modalAction.value = type
    modalVisible.value = true
    nextTick(()=>{
      if (type != 'add') {
        $form.value?.getFormData(id)
    }
    })

  }

  /* 更多操作select 选中时触发的回调函数 */
  function handleSelect(key) {
    console.log(key);
  }

  /** 保存 */
  function handleSave() {
    console.log($form.value);
    $form.value.handleSave(doCreate, doUpdate, modalLoading,modalVisible,refresh)
  }
  /** 删除 */
  function handleDelete(id, confirmOptions) {
    if (isNullOrWhitespace(id)) return
    $dialog.confirm({
      content: '确定删除？',
      async confirm() {
        try {
          // modalLoading.value = true
          const data = await doDelete(id)
          $message.success('删除成功')
          // modalLoading.value = false
          refresh(data)
        } catch (error) {
          // modalLoading.value = false
        }
      },
      ...confirmOptions,
    })
  }

  return {
    $table,
    tableData,
    queryItems,
    extraParams,
    handleView,
    handleSelect,
    handleDelete,
    $form,
    modalVisible,
    modalAction,
    modalTitle,
    modalLoading,
    handleSave,
  }
}
