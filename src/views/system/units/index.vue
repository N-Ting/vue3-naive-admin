<template>
  <CommonPage show-footer title="文章">
    <template #action>
      <div>
        <n-button type="primary" secondary @click="$table?.handleExport()">
          <TheIcon icon="mdi:download" :size="18" class="mr-5" />
          导出
        </n-button>
        <n-button type="primary" class="ml-16" @click="handleAdd">
          <TheIcon icon="material-symbols:add" :size="18" class="mr-5" />
          新建文章
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
    <UnitForm  ref="$unitForm"/>
    <!-- 企业角色新增/编辑/查看 -->
    <UnitRoleForm ref="$unitRoleForm" />
  </CommonPage>
</template>

<script setup>
import { NButton } from 'naive-ui'
import { formatDateTime, renderIcon } from '@/utils'
import api from './api'
import UnitForm from './UnitForm.vue'
import UnitRoleForm from './UnitRoleForm.vue'
import { useUnitStore } from '@/store'
defineOptions({ name: 'Units' })

const $table = ref(null)
/** 表格数据，触发搜索的时候会更新这个值 */
const tableData = ref([])
/** QueryBar筛选参数（可选） */
const queryItems = ref({ unitName: '' })
/** 补充参数（可选） */
const extraParams = ref({})

//企业角色，以id对应属性值的对象
const dataObj = ref({
  role: {},
})
const $unitForm = ref(null)
const $unitRoleForm = ref(null)
// 获取企业的store
const unitStore = useUnitStore()

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
      return h('span', formatDateTime(row['status']))
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
            text:true,
            onClick: () => handleUnit('view',row.id),
          },
          { default: () => '查看', icon: renderIcon('majesticons:eye-line', { size: 14 }) }
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'primary',
            style: 'margin-left: 15px;',
            text:true,
            onClick: () => handleUnit('edit',row.id),
          },
          { default: () => '编辑', icon: renderIcon('material-symbols:edit-outline', { size: 14 }) }
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'primary',
            style: 'margin-left: 15px;',
            text:true,
            onClick: () => handleRole('edit',row.id),
          },
          { default: () => '角色信息', icon: renderIcon('material-symbols:edit-outline', { size: 14 }) }
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'error',
            style: 'margin-left: 15px;',
            text:true,
            onClick: () => handleUnit(row.id),
          },
          {
            default: () => '删除',
            text:true,
            icon: renderIcon('material-symbols:delete-outline', { size: 14 }),
          }
        ),
      ]
    },
  },
]
function handleUnit(type,id) {
  $unitForm.value?.showVisible(type,id)
}
//新增编辑查看
function handleRole(type,id) {
  $unitRoleForm.value?.showVisible(type,id)
}
</script>
