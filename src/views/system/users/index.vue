<template>
  <CommonPage show-footer title="用户管理">
    <CrudTable
      ref="$table"
      v-model:query-items="queryItems"
      :extra-params="extraParams"
      :scroll-x="1200"
      :columns="columns"
      :get-data="api.getUserList"
      @on-data-change="(data) => (tableData = data)"
    >
      <template #queryBar>
        <QueryBarItem label="账号" :label-width="70">
          <n-input
            v-model:value="queryItems.loginName"
            type="text"
            placeholder="请输入账号"
            @keydown.enter="$table?.handleSearch"
          />
        </QueryBarItem>
      </template>
    </CrudTable>
    <CrudModal
      v-model:visible="modalVisible"
      :title="modalTitle"
      :loading="modalLoading"
      :show-footer="modalAction !== 'view'"
      @on-save="handleSave"
    >
      <FormForm
        ref="$form"
        :disabled="modalAction === 'view'"
        :formAction="modalAction"
        :formData="formData"
        :cols="cols"
        :get-form-data="api.getUserById"
      />
    </CrudModal>
    <CrudModal
      v-model:visible="tableVisible"
      :title="'所在企业'"
      :loading="modalLoading"
      :show-footer="modalAction !== 'view'"
      @on-save="handleSave"
    >
    <CrudTable
      ref="$table"
      v-model:query-items="queryUnit"
      :extra-params="unitParams"
      :scroll-x="1200"
      :columns="unitColumns"
      :get-data="api.getUserList"
      @on-data-change="(data) => (tableData = data)"
    >
    </CrudTable>
    </CrudModal>
  </CommonPage>
</template>

<script setup>
import { NButton, NTag } from 'naive-ui'
import api from './api'
import { useTable,useUser } from '@/composables'
defineOptions({ name: 'Users' })

const cols = ref(2)

onMounted(async () => {
  $table.value?.handleSearch()
})
const columns = [
  {
    title: '序号',
    width: 60,
    align: 'center',
    render: (text, record, index) => {
      return record + 1
    },
  },
  {
    title: '账号',
    key: 'loginName',
    width: 60,
    align: 'center',
  },
  { title: '姓名', key: 'nickName', width: 80, ellipsis: { tooltip: true } },
  {
    title: '手机号',
    key: 'phone',
    width: 80,
  },
  { title: '身份证', key: 'idcard', width: 80 },
  // {
  //   title: '手机状态',
  //   key: 'state',
  //   width: 150,
  //   render(row) {
  //     return h(
  //       NTag,
  //       {
  //         type: row.status ? 'success' : 'info',
  //       },
  //       {
  //         default: () => (row.status ? '启用' : '禁用'),
  //       }
  //     )
  //   },
  // },
  {
    title: '入驻日期',
    key: 'createdAt',
    width: 150,
  },
  // {
  //   title: '来源终端',
  //   key: 'createdAt',
  //   width: 150
  // },
  // {
  //   title: '来源平台',
  //   key: 'createdAt',
  //   width: 150
  // },
  {
    title: '状态',
    key: 'state',
    width: 80,
    render(row) {
      return h(
        NTag,
        {
          type: row.status ? 'success' : 'info',
        },
        {
          default: () => (row.status ? '已启用' : '禁用'),
        }
      )
    },
  },
  {
    title: '操作',
    key: 'actions',
    width: 280,
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
            // icon: renderIcon('majesticons:eye-line', { size: 14 })
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
          NButton,
          {
            size: 'small',
            type: 'primary',
            style: 'margin-left: 15px;margin-right: 15px;',
            text: true,
            onClick: () => handleUnit(row.id),
          },
          {
            default: () => '所在企业',
            // icon: renderIcon('material-symbols:edit-outline', { size: 14 })
          }
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'primary',
            style: 'margin-left: 15px;margin-right: 15px;',
            text: true,
            onClick: () => handleMember(row.id),
          },
          {
            default: () => '禁用',
            // icon: renderIcon('material-symbols:edit-outline', { size: 14 })
          }
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'primary',
            style: 'margin-left: 15px;margin-right: 15px;',
            text: true,
            onClick: () => handleMember(row.id),
          },
          {
            default: () => '认证解绑',
            // icon: renderIcon('material-symbols:edit-outline', { size: 14 })
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
    span: 2,
  },
  {
    label: '账号',
    value: 'loginName',
    type: 'input',
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
    label: '姓名',
    value: 'nickName',
    type: 'input',
  },

  {
    label: '邮箱',
    value: 'email',
    type: 'input',
  },
  {
    label: '身份证',
    value: 'idcard',
    type: 'input',
  },
])
const unitColumns = [
  {
    title: '序号',
    width: 60,
    align: 'center',
    render: (text, record, index) => {
      return record + 1
    },
  },
  {
    title: '账号',
    key: 'loginName',
    width: 60,
    align: 'center',
  },
  { title: '企业名称', key: 'nickName', width: 80, ellipsis: { tooltip: true } },
  {
    title: '统一社会信用代码',
    key: 'phone',
    width: 80,
  },
  { title: '企业角色', key: 'idcard', width: 80 },

  {
    title: '用户角色',
    key: 'createdAt',
    width: 150,
  },
  {
    title: '是否管理员',
    key: 'state',
    width: 80,
    render(row) {
      return h(
        NTag,
        {
          type: row.status ? 'success' : 'info',
        },
        {
          default: () => (row.status ? '已启用' : '禁用'),
        }
      )
    },
  },
  {
    title: '操作',
    key: 'actions',
    width: 280,
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
            default: () => '分配角色',
            // icon: renderIcon('majesticons:eye-line', { size: 14 })
          }
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'primary',
            style: 'margin-left: 15px;',
            text: true,
            onClick: () => cancel(row.id),
          },
          {
            default: () => '取消管理员',
          }
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'primary',
            style: 'margin-left: 15px;margin-right: 15px;',
            text: true,
            onClick: () => removeUnit('edit', row.id),
          },
          {
            default: () => '移出企业',
          }
        ),
      ]
    },
  },
]

// 所在企业
function handleUnit(id) {
  // modalAction.value = type
  // tableVisible.value = true
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
  formData,
} = useTable({
  name: '用户管理',
  formList,
  cols,
  doCreate: '',
  doUpdate: api.updateUser,
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
</script>
