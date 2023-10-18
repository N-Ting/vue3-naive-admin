<template>
  <CommonPage show-footer title="菜单管理">
    <div h-screen>
      <n-grid x-gap="0" :cols="6" border-t border-t-solid bc-eee pt-20 h-screen>
        <n-gi :span="2" pr-15>
          <CrudTree
            ref="$tree"
            v-model:query-items="queryTree"
            :label-field="'title'"
            :get-tree-data="api.getMenusList"
            :render-prefix="renderPrefix"
            :render-suffix="renderSuffix"
            :defaultExpandedKeys="defaultExpandedKeys"
            @handleSelectedKeysChange="handleSelectedKeysChange"
          >
            <template #queryBar>
              <QueryBarItem label="" :label-width="70">
                <n-input
                  v-model:value="queryTree.deptName"
                  type="text"
                  placeholder="请输入关键字"
                  clearable
                  @keydown.enter="$table?.handleSearch"
                />
              </QueryBarItem>
            </template>
          </CrudTree>
        </n-gi>
        <n-gi :span="4" border-l border-l-solid bc-eee pl-15>
          <CrudTable
            ref="$table"
            v-model:query-items="queryTable"
            :extra-params="extraParams"
            :scroll-x="1200"
            :columns="columns"
            :get-data="api.getUnitMember"
            @on-data-change="(data) => (tableData = data)"
          >
            <template #leftBtn>
              <div>
                <n-button type="primary" @click="handleMember('add')">新增资源</n-button>
              </div>
            </template>
          </CrudTable>
        </n-gi>
      </n-grid>
    </div>
    <CrudModal
      v-model:visible="modalVisible"
      :title="modalTitle"
      :loading="modalLoading"
      :show-footer="modalAction !== 'view'"
      @on-save="handleSave"
    >
      <FormForm
        ref="$form"
        :formAction="modalAction"
        :disabled="modalAction === 'view'"
        :formData="formData"
        :get-form-data="api.getMenusById"
      />
    </CrudModal>
  </CommonPage>
</template>

<script setup>
import api from './api'
import { useUserStore } from '@/store'
import { useTable } from '@/composables'
import { NDropdown } from 'naive-ui'
import { renderIcon } from '@/utils'
const userStore = useUserStore()
const queryTree = ref({
  unitId: userStore.userInfo.unitId,
})

const columns = [
  {
    title: '序号',
    width: 10,
    align: 'center',
    render: (text, record, index) => {
      return record + 1
    },
  },
  {
    title: '资源名称',
    key: 'loginName',
    width: 10,
    align: 'center',
  },
  { title: '资源编号', key: 'nickName', width: 10 },
  {
    title: '操作',
    key: 'actions',
    width: 30,
    align: 'center',
    fixed: 'right',
    hideInExcel: true,
    render(row) {
      return [
        h(
          NButton,
          {
            size: 'small',
            type: 'primary',
            text: true,
            onClick: () => handleView('edit', row.id),
          },
          {
            default: () => '修改',
          }
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'primary',
            style: 'margin-left: 15px;',
            text: true,
            onClick: () => resetPassword(row.id),
          },
          {
            default: () => '重置密码',
          }
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'primary',
            style: 'margin-left: 15px;margin-right: 15px;',
            text: true,
            onClick: () => handlePhone('edit', row.id),
          },
          {
            default: () => '更换手机',
          }
        ),
        h(
          NDropdown,
          {
            showArrow: true,
            trigger: 'click',
            options: [
              {
                label: '取消管理员',
                key: 'cancelManager',
                props: {},
              },
              {
                label: '移除企业',
                key: 'removeUnit',
              },
            ],
            onSelect: (key) => handleSelect(key, row.id),
          },
          {
            default: () =>
              h(
                NButton,
                {
                  size: 'small',
                  type: 'primary',
                  text: true,
                  'icon-placement': 'right', //按钮中图标的位置
                },
                {
                  default: () => '更多操作',
                  icon: renderIcon('ic:outline-keyboard-arrow-down', { size: 14 }),
                }
              ),
          }
        ),
      ]
    },
  },
]

const formList = ref([
  {
    label: '菜单名称',
    value: 'title',
    type: 'input',
    rule: {
      required: true,
      trigger: ['input', 'blur'],
    },
  },
  {
    label: '菜单路由',
    value: 'path',
    type: 'input',
    rule: {
      required: true,
      trigger: ['input', 'blur'],
    },
  },
  {
    label: '菜单图标',
    value: 'icon',
    type: 'input',
  },
  {
    label: '排序',
    value: 'sort',
    type: 'number',
    rule: {
      type: 'number',
      required: true,
      trigger: ['blur'],
      message: '请输入排序',
    },
  },
  {
    label: '说明',
    value: 'email',
    type: 'textarea',
  },
])

// 当前树形数据选中,调用右侧的表格查询
function handleSelectedKeysChange(selectedKeys) {
  queryItems.value.unitId = queryTree.value.unitId
  queryItems.value.id = selectedKeys.join(',')
  $table.value?.handleSearch()
}

function renderPrefix({ option }) {
  // if (option.title) {
  return h(
    renderIcon('system-uicons:airplay', {
      size: 24,
      color: '#316c72',
      style: 'vertical-align: middle;',
    })
  )
  // }
}
function renderSuffix({ option, selected }) {
  return h(
    NDropdown,
    {
      showArrow: true,
      trigger: 'click',
      options: [
        {
          label: '新增',
          key: 'add',
          props: {},
        },
        {
          label: '修改',
          key: 'edit',
        },
        {
          label: '删除',
          key: 'delete',
        },
      ],
      onSelect: (key) => handleView(key, queryItems.value.id),
    },
    {
      default: () =>
        h(
          renderIcon('ph:dots-three-light', {
            size: 24,
            color: '#316c72',
            style: 'vertical-align: middle;',
          })
        ),
    }
  )
}

const {
  $table,
  tableData,
  queryItems,
  extraParams,
  handleView,
  handleDelete,
  $form,
  modalVisible,
  modalAction,
  modalTitle,
  modalLoading,
  handleSave,
  handleSelect,
  formData,
} = useTable({
  name: '成员管理',
  formList,
  cols: null,
  doCreate: api.createMenus,
  doUpdate: api.updateMenus,
  doDelete: api.deleteMenus,
  refresh: () => $table.value?.handleSearch(),
})
</script>

<style lang="scss" scoped></style>
