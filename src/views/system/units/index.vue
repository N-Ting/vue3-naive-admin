<template>
  <CommonPage show-footer title="企业管理">
    <template #action>
      <div>
        <n-button type="primary" class="ml-16" @click="handleView('add')">
          <TheIcon icon="material-symbols:add" :size="18" class="mr-5" />
          新增
        </n-button>
      </div>
    </template>

    <CrudTable
      ref="$table"
      v-model:query-items="queryItems"
      :extra-params="extraParams"
      :scroll-x="1200"
      :columns="columns"
      :get-data="api.getPosts"
      @on-data-change="(data) => (tableData = data)"
    >
      <template #queryBar>
        <QueryBarItem label="企业名称" :label-width="70">
          <n-input
            v-model:value="queryItems.unitName"
            type="text"
            placeholder="请输入企业名称"
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
        ref="$form" :disabled="modalAction === 'view'"
        :formAction="modalAction"
        :formData="formData"
        :cols="1"
        :get-form-data="api.getUnitById"
      />
    </CrudModal>
    <!-- 部门信息 -->
    <UnitDepart ref="$unitDepart" />
    <!-- 成员信息 -->
    <UnitMember ref="$unitMember" />
  </CommonPage>
</template>

<script setup>
import { NButton, NTag, NDropdown } from 'naive-ui'
import { formatDateTime, renderIcon } from '@/utils'
import api from './api'
import { useUnitStore } from '@/store'
import { useTable } from '@/composables'
import UnitDepart from './components/UnitDepart.vue'
import UnitMember from './components/UnitMember.vue'
defineOptions({ name: 'Units' })
//企业角色，以id对应属性值的对象
const dataObj = ref({
  role: {},
})
const $unitDepart = ref(null)
const $unitMember = ref(null)

// 获取企业的store
const unitStore = useUnitStore()
const roleList = computed(()=>unitStore.unitRole.map((v) => ({ label: v.roleName, value: v.id })))
const formData = ref([
  {
    label: '企业名称',
    value: 'unitName',
    type: 'input',
    rule: {
      required: true,
      trigger: ['input', 'blur'],
    },
  },
  {
    label: '统一信用代码',
    value: 'unitCode',
    type: 'input',
    rule: {
      required: true,
      trigger: ['input', 'blur'],
    },
  },
  {
    label: '地址',
    value: 'unitAddress',
    type: 'input',
    rule: {
      required: true,
      trigger: ['input', 'blur'],
    },
  },
  {
    label: '角色类型',
    value: 'roleId',
    type: 'select',
    options: roleList,
  },
])

onMounted(async () => {
  await getUnitRole()
  $table.value?.handleSearch()
})
// 企业角色
async function getUnitRole() {
  const { data } = await api.getUnitRole()
  unitStore.setUnitRole(data)
  const obj = {}
  data.forEach((item) => {
    obj[item.id] = item.roleName
  })
  dataObj.role = obj
}

const columns = [
  {
    title: '企业名称',
    key: 'unitName',
    width: 60,
    align: 'center',
  },
  { title: '统一信用代码', key: 'provinceCode', width: 150, ellipsis: { tooltip: true } },
  {
    title: '企业角色',
    key: 'roleId',
    width: 80,
    ellipsis: { tooltip: true },
    render(row) {
      return h('span', dataObj.role[row.roleId])
    },
  },
  { title: '地址', key: 'unitAddress', width: 80 },
  {
    title: '创建时间',
    key: 'createDate',
    width: 150,
    render(row) {
      return h('span', formatDateTime(row['createDate']))
    },
  },
  {
    title: '状态',
    key: 'status',
    width: 150,

    render(row) {
      return h(
        NTag,
        {
          type: row.status ? 'success' : 'info',
        },
        {
          default: () => (row.status ? '启用' : '禁用'),
        }
      )
    },
  },
  {
    title: '操作',
    key: 'actions',
    width: 240,
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
            onClick: () => handleView('view', row.id),
          },
          {
            default: () => '查看',
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
            onClick: () => handleView('edit', row.id),
          },
          {
            default: () => '编辑',
            // icon: renderIcon('material-symbols:edit-outline', { size: 14 })
          }
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'primary',
            style: 'margin-left: 15px;',
            text: true,
            onClick: () => handleDepart(row.id),
          },
          {
            default: () => '部门信息',
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
            default: () => '成员信息',
            // icon: renderIcon('material-symbols:edit-outline', { size: 14 })
          }
        ),
        h(
          NDropdown,
          {
            style: 'margin-left: 15px;',
            options: [
              {
                label: '成员信息',
                key: 'profile',
              },
              {
                label: '启用',
                key: 'profile',
              },
              {
                label: '禁用',
                key: 'profile',
              },
            ],
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

// 部门信息
function handleDepart(id) {
  $unitDepart.value?.showVisible(id)
}
// 成员信息
function handleMember(id) {
  $unitMember.value?.showVisible(id)
}
const { $table, tableData, queryItems, extraParams, handleView, handleDelete,$form,modalVisible, modalAction, modalTitle, modalLoading, handleSave } = useTable({
  name:'企业管理',
  doCreate: api.addUnitPost,
  doUpdate: api.updateUnit,
  doDelete: api.deletePost,
  refresh: () => $table.value?.handleSearch(),
})
</script>
