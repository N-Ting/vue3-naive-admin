<template>
  <QueryBar v-if="$slots.queryBar" mb-30 @search="handleSearch" :show="false">
    <slot name="queryBar" />
  </QueryBar>
  <n-tree
    block-line
    :data="treeData"
    :default-expanded-keys="defaultExpandedKeys"
    :key-field="keyField"
    :label-field="labelField"
    :default-selected-keys="defaultSelectedKeys"
    @update:selected-keys="handleSelectedKeysChange"
    @update:expanded-keys="handleExpandedKeysChange"
    selectable
  />
</template>

<script setup>
const props = defineProps({
  /* 
    自定义 key的字段
  */
  keyField: {
    type: String,
    default: 'id',
  },
  //自定义 label 的字段
  labelField: {
    type: String,
    default: 'deptName',
  },
  /** query中的参数 */
  queryItems: {
    type: Object,
    default() {
      return {}
    },
  },
  /* tree的数据接口 */
  getTreeData: {
    type: Function,
    required: true,
  },
})

const emit = defineEmits(['updateTreeData','handleSelectedKeysChange', 'handleExpandedKeysChange'])
const treeData = ref([])
const defaultExpandedKeys = ref([])
const defaultSelectedKeys = ref([])
onMounted(() => {
  handleQuery()
})
function handleSearch() {
  handleQuery()
}

/* 获取tree数据 */
async function handleQuery() {
  const { data } = await props.getTreeData({
    ...props.queryItems,
  })
  treeData.value = data || []
  emit('updateTreeData',data)
  // defaultExpandedKeys.value = data[0].id
  // defaultSelectedKeys.value = data[0].id
}
/* 节点选中项发生变化时的回调函数 */
function handleSelectedKeysChange(selectedKeys) {
  emit('handleSelectedKeysChange', selectedKeys)
  console.log(selectedKeys, 'selectedKeys')
}
/* 节点展开项发生变化时的回调函数 */
function handleExpandedKeysChange(expndedKeys) {
  console.log(expndedKeys, 'expndedKeys')
}

defineExpose({
  handleSearch,
})
</script>

<style lang="scss" scoped></style>
