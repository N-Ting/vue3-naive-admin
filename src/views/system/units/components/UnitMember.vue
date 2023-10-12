<template>
  <CrudDrawer
    v-model:visible="drawerVisible"
    :width="'81%'"
    :title="drawerTitle"
    :loading="saveLoading"
    :show-footer="drawerAction !== 'view'"
    @on-save="handleSave"
    :showFooter="false"
  >
    <n-grid x-gap="0" :cols="4">
      <n-grid-item :span="1">
        <CrudTree
          ref="$tree"
          v-model:query-items="queryTree"
          :get-tree-data="api.getUnitDepart"
          :defaultExpandedKeys="defaultExpandedKeys"
          @updateTreeData="updateTreeData"
          @handleSelectedKeysChange="handleSelectedKeysChange"
        >
          <template #queryBar>
            <QueryBarItem label="">
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
      <n-grid-item :span="3" border-l border-l-solid bc-eee pl-15>
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
              <n-button type="primary" @click="handleMember('add')">新增</n-button>
              <n-dropdown :options="options" :show-arrow="true">
                <n-button ml-20 type="primary" icon-placement="right">
                  更多操作
                  <template #icon>
                    <n-icon ml-5 size="20">
                      <icon-ic:outline-keyboard-arrow-down />
                    </n-icon>
                  </template>
                </n-button>
              </n-dropdown>
            </div>
          </template>
          <template #queryBar>
            <QueryBarItem label="">
              <n-input
                v-model:value="queryItems.unitName"
                type="text"
                placeholder="请输入"
                @keydown.enter="$table?.handleSearch"
              />
            </QueryBarItem>
          </template>
        </CrudTable>
      </n-grid-item>
    </n-grid>
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
        :cols="cols"
        :get-form-data="api.getUnitMemberById"
      />
    </CrudModal>
  </CrudDrawer>
</template>

<script setup>
import { NButton, NTag, NDropdown } from 'naive-ui'
import { renderIcon } from '@/utils'
import api from '../api'
import { useDrawer, useTable,useUser } from '@/composables'
import { useUnitStore } from '@/store'
// 树形菜单参数
const queryTree = ref({
  unitId: '',
  deptName: '',
})

// 表格参数
const queryTable = ref({
  unitId: '',
})
const $tree = ref(null)
const role = computed(() => {
  const obj = {}
  unitStore.unitRole.forEach((item) => {
    obj[item.id] = item.roleName
  })
  return obj
})
const cols = ref(2)
// 获取企业的store
const unitStore = useUnitStore()
//用户角色，以id对应属性值的对象
const roleList = ref({
  role: {},
})
const roleOptions = computed(() =>
  unitStore.userRole.map((v) => ({ label: v.roleName, value: v.id }))
)
const treeList = ref([])

const options = ref([
  {
    label: '邀请成员',
    key: 'invite',
  },
  {
    label: '导入',
    key: 'import',
  },
  {
    label: '导出',
    key: 'export',
  },
])

function showVisible(id) {
  drawerVisible.value = true
  placement.value = 'right'
  queryTree.value.unitId = id
  getUserRole({ unitId: id })
}

// 用户角色
async function getUserRole(query) {
  const { data } = await api.getUserRole(query)
  unitStore.setUserRole(data)
  const obj = {}
  data.forEach((item) => {
    obj[item.id] = item.roleName
  })
  roleList.role = obj
}

// 树形数据
function updateTreeData(val) {
  treeList.value = val.map((v) => {
    if (v.children && v.children.length != 0) {
      v.children = v.children.map((c) => ({ label: c.deptName, key: c.id }))
    }
    return { label: v.deptName, key: v.id, children: v.children }
  })
}

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
    title: '账号',
    key: 'loginName',
    width: 10,
    align: 'center',
    render(row) {
      return [
        h(
          'span',
          {},
          {
            default: () => row.loginName,
          }
        ),
        h(
          NTag,
          {
            type: 'success',
            size: 'small',
            round: true,
          },
          {
            default: () => '管',
          }
        ),
      ]
    },
  },
  { title: '姓名', key: 'nickName', width: 10},
  {
    title: '手机号',
    key: 'phone',
    width: 10,
  },
  {
    title: '角色',
    key: 'roleId',
    width: 10,
    render(row) {
      return h('span', role[row.roleId])
    },
  },
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
    label: '头像',
    value: 'headPic',
    type: 'upload-img',
    accept: 'image/png, image/jpeg,image/jpg',
    rule: {},
  },
  {
    label: '姓名',
    value: 'nickName',
    type: 'input',
    rule: {},
  },
  {
    label: '手机号',
    value: 'phone',
    type: 'input',
    rule: {
      required: true,
      trigger: ['input', 'blur'],
    },
  },
  {
    label: '身份证',
    value: 'idcard',
    type: 'input',
  },
  {
    label: '角色',
    value: 'roleId',
    type: 'select',
    options: roleOptions,
  },
  {
    label: '邮箱',
    value: 'email',
    type: 'input',
  },
  {
    label: '部门',
    value: 'deptId',
    type: 'tree-select',
    options: treeList,
  },
  {
    label: '直属主管',
    value: 'unitAddress',
    type: 'select',
  },
  {
    label: '账号',
    value: 'loginName',
    type: 'input',
  },
  {
    label: '密码',
    value: 'remark',
    type: 'input',
  },
])

const { drawerVisible, drawerAction, drawerTitle, placement, saveLoading } = useDrawer({
  name: '成员信息',
  doCreate: api.addUnitDepart,
  doUpdate: api.updateUnitDepart,
  doDelete: api.delUnitDepart,
  refresh: () => $tree.value?.handleSearch(),
})

// 当前树形数据选中,调用右侧的表格查询
function handleSelectedKeysChange(selectedKeys) {
  queryTable.value.unitId = queryTree.value.unitId
  queryTable.value.deptId = selectedKeys.join(',')
  $table.value?.handleSearch()
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
  formData
} = useTable({
  name: '成员管理',
  formList,
  cols,
  doCreate: api.addUnitMember,
  doUpdate: api.updateUnitMember,
  doDelete: api.deletePost,
  refresh: () => $table.value?.handleSearch(),
})

const {
    resetPassword,
    handlePhone,
} = useUser({
    modalAction,
    modalVisible,
    cols,
    formData,
    modalTitle,
    doReset:''
})



// 抛出方法，让父级可以使用
defineExpose({
  showVisible,
})
</script>

<style lang="scss" scoped></style>
