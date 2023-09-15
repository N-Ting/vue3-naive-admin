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
      :isPagination="false"
      @on-checked="onChecked"
      @on-data-change="(data) => (tableData = data)"
    >
      <template #queryBar>
        <QueryBarItem label="标题" :label-width="50">
          <n-input
            v-model:value="queryItems.title"
            type="text"
            placeholder="请输入标题"
            @keydown.enter="$table?.handleSearch"
          />
        </QueryBarItem>
      </template>
    </CrudTable>
    <!-- 新增/编辑/查看 -->
    <CrudModal
      v-model:visible="modalVisible"
      :title="modalTitle"
      :loading="modalLoading"
      :show-footer="modalAction !== 'view'"
      @on-save="handleSave"
    >
      <n-form
        ref="modalFormRef"
        label-placement="left"
        label-align="left"
        :label-width="80"
        :model="modalForm"
        :disabled="modalAction === 'view'"
      >
        <n-form-item label="作者" path="author">
          <n-input v-model:value="modalForm.author" disabled />
        </n-form-item>
        <n-form-item
          label="文章标题"
          path="title"
          :rule="{
            required: true,
            message: '请输入文章标题',
            trigger: ['input', 'blur'],
          }"
        >
          <n-input v-model:value="modalForm.title" placeholder="请输入文章标题" />
        </n-form-item>
        <n-form-item
          label="文章内容"
          path="content"
          :rule="{
            required: true,
            message: '请输入文章内容',
            trigger: ['input', 'blur'],
          }"
        >
          <n-input
            v-model:value="modalForm.content"
            placeholder="请输入文章内容"
            type="textarea"
            :autosize="{
              minRows: 3,
              maxRows: 5,
            }"
          />
        </n-form-item>
      </n-form>
    </CrudModal>
  </CommonPage>
</template>

<script setup>
import { NButton } from 'naive-ui'
import api from './api'

defineOptions({ name: 'Roles' })

const $table = ref(null)
/** 表格数据，触发搜索的时候会更新这个值 */
const tableData = ref([])
/** QueryBar筛选参数（可选） */
const queryItems = ref({})
/** 补充参数（可选） */
const extraParams = ref({})

onActivated(() => {
  $table.value?.handleSearch()
})

const columns = [
  {
    title: '角色名称',
    key: 'roleName',
    width: 150,
    align: 'center',
    fixed: 'left',
  },
  { title: '类型', key: 'title', width: 150, ellipsis: { tooltip: true } },
  { title: '角色编码', key: 'roleCode', width: 80, ellipsis: { tooltip: true } },
  { title: '说明', key: 'remark', width: 80 },
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
            text: true, //文本按钮
            type: 'primary',
            onClick: () => handleView(row),
          },
          {
            default: () => '配置企业权限',
            // icon: renderIcon('majesticons:eye-line', { size: 14 })
          }
        ),
        h(
          NButton,
          {
            size: 'small',
            text: true,
            type: 'primary',
            style: 'margin-left: 15px;',
            onClick: () => handleEdit(row),
          },
          {
            default: () => '分配企业',
            // icon: renderIcon('material-symbols:edit-outline', { size: 14 }),
          }
        ),

        h(
          NButton,
          {
            size: 'small',
            text: true,
            type: 'primary',
            style: 'margin-left: 15px;',
            onClick: () => handleDelete(row.id),
          },
          {
            default: () => '用户权限配置（菜单-角色）',
            // icon: renderIcon('material-symbols:delete-outline', { size: 14 }),
          }
        ),
      ]
    },
  },
]
</script>
