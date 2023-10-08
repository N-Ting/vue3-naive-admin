<template>
  <CrudDrawer
    v-model:visible="drawerVisible"
    v-model:showForm="showForm"
    :title="drawerTitle"
    :loading="saveLoading"
    :show-footer="drawerAction !== 'view'"
    @on-save="handleSave" :showFooter="false" 
  >
    <n-grid x-gap="0" :cols="2">
      <n-grid-item>
        <CrudTree
          ref="$tree"
          v-model:query-items="queryItems"
          :get-tree-data="api.getUnitDepart"
          :defaultExpandedKeys="defaultExpandedKeys"
          @handleSelectedKeysChange="handleSelectedKeysChange"
        >
          <template #queryBar>
            <QueryBarItem label="" :label-width="70">
              <n-input
                v-model:value="queryItems.deptName"
                type="text"
                placeholder="请输入关键字"
                clearable
                @keydown.enter="$table?.handleSearch"
              />
            </QueryBarItem>
          </template>
        </CrudTree>
      </n-grid-item>
      <n-grid-item border-l border-l-solid bc-eee pl-15>
        <header min-h-60 b-1 rounded-8 pt-15 pb-15 bc-ccc dark:bg-black>
          <n-button v-if="addShow" type="primary" @click="addLevel('add')">新增下一级</n-button>
          <n-button :loading="saveLoading" ml-20 type="primary" @click="handleSave">保存</n-button>
          <n-button :loading="delLoading" ml-20 type="primary" @click="handleDelete">删除</n-button>
        </header>
        <FormItem
          v-show="showForm"
          ref="$form"
          :formAction="drawerAction"
          :formData="formData"
          :get-form-data="api.getUnitDepartById"
        />
      </n-grid-item>
    </n-grid>
  </CrudDrawer>
</template>

<script setup>
import api from './api'
import { useDrawer } from '@/composables'
// 参数
const queryItems = ref({
  unitId: '',
  deptName:'',
})
const $tree = ref(null)
const formData = ref([
  {
    label: '上级部门',
    value: 'unitName',
    type: 'input',
    rule: {},
  },
  {
    label: '部门名称',
    value: 'deptName',
    type: 'input',
    rule: {
      required: true,
      trigger: ['input', 'blur'],
    },
  },
  {
    label: '部门类型',
    value: 'unitAddress',
    type: 'select',
    options: [
      {
        label: '人事',
        value: '0',
      },
      {
        label: '开发',
        value: '1',
      },
      {
        label: '财务',
        value: '2',
      },
      {
        label: '行政',
        value: '3',
      },
    ],
  },
  {
    label: '分管领导',
    value: 'managerUserName',
    type: 'input',
  },
  {
    label: '排序',
    value: 'unitAddress',
    type: 'inputNumber',
  },
  {
    label: '说明',
    value: 'remark',
    type: 'textarea',
  },
])

function showVisible(id) {
  drawerVisible.value = true
  placement.value = 'right'
  queryItems.value.unitId = id
}

const {
  drawerVisible,
  drawerAction,
  drawerTitle,
  placement,
  $form,
  showForm,
  saveLoading,
  addShow,
  handleSelectedKeysChange,
  handleSave,
  addLevel,
  handleDelete,
} = useDrawer({
  name: '部门信息',
  doCreate: api.addUnitDepart,
  doUpdate: api.updateUnitDepart,
  doDelete: api.delUnitDepart,
  refresh: () => $tree.value?.handleSearch(),
})

// // 抛出方法，让父级可以使用
defineExpose({
  showVisible,
})
</script>

<style lang="scss" scoped></style>
