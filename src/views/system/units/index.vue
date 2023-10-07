<template>
  <CommonPage show-footer title="企业管理">
    <template #action>
      <div>
        <n-button type="primary" class="ml-16" @click="handleUnit('add')">
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
    <UnitForm ref="$unitForm" />
    <!-- 部门信息 -->
    <UnitDepart ref="$unitDepart"/>
    <!-- 企业角色新增/编辑/查看 -->
    <!-- <UnitRoleForm ref="$unitRoleForm" /> -->
  </CommonPage>
</template>

<script setup>
import { NButton, NTag, NDropdown } from 'naive-ui'
import { formatDateTime, renderIcon } from '@/utils'
import api from './api'
import UnitForm from './UnitForm.vue'
import UnitDepart from './UnitDepart.vue'
// import UnitRoleForm from './UnitRoleForm.vue'
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
const $unitDepart = ref(null)
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
            onClick: () => handleUnit('view', row.id, $unitForm),
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
            onClick: () => handleUnit('edit', row.id, $unitForm),
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
            onClick: () => handleMember('left', row.roleId, $unitRoleForm),
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
            default: () => '更多操作',
            icon: renderIcon('material-symbols:delete-outline', { size: 14 }),
          }
        ),
        // h(
        //   NButton,
        //   {
        //     size: 'small',
        //     type: 'primary',
        //     style: 'margin-left: 15px;',
        //     text: true,
        //     onClick: () => handleView(row.id),
        //   },
        //   {
        //     default: () => '成员信息',
        //     // icon: renderIcon('material-symbols:delete-outline', { size: 14 }),
        //   }
        // ),
      ]
    },
  },
]
//新增编辑查看
function handleUnit(type, id) {
  $unitForm.value?.showVisible(type, id)
}

function handleDepart(id) {
  $unitDepart.value?.showVisible(id)
}

</script>
