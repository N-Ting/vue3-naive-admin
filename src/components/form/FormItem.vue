<template>
  <div border-l border-l-solid bc-eee pl-15>
    <n-form
      ref="modalFormRef"
      :label-placement="labelPlacement"
      :label-align="labelAlign"
      :label-width="labelWidth"
      :require-mark-placement="markPlacement"
      :model="modalForm"
      :disabled="disabled"
    >
      <n-form-item
        v-for="(item, i) in formData"
        :key="i"
        :label="item.label"
        :path="item.value"
        :rule="item.rule"
      >
        <!-- input框和textarea -->
        <n-input
          v-model:value="modalForm[item.value]"
          v-if="item.type == 'input' || item.type == 'textarea'"
          :type="item.value"
        />
        <!-- 下拉框 -->
        <n-select
          v-model:value="modalForm[item.value]"
          :options="item.options"
          v-else-if="item.type == 'select'"
        />
        <!-- 数据输入框 -->
        <n-input-number
          v-model:value="modalForm[item.value]"
          clearable
          v-else-if="item.type == 'inputNumber'"
        />
        <!-- 单选 -->
        <n-radio-group
          v-model:value="modalForm[item.value]"
          name="radiogroup"
          v-else-if="item.type.indexOf('radio') != -1"
        >
          <!-- 选项组 -->
          <n-radio
            v-for="radio in item.options"
            :key="radio.value"
            :value="radio.value"
            v-if="item.type == 'radio'"
          >
            {{ radio.label }}
          </n-radio>
          <!-- 按钮组 item.options：选项组数据   size:尺寸-->
          <n-radio-button
            v-for="radiobtn in item.options"
            :key="radiobtn.value"
            :value="radiobtn.value"
            :label="radiobtn.label"
            :size="item.size"
            v-else
          />
        </n-radio-group>

        <!-- 复选框 -->
        <n-checkbox-group v-model:value="modalForm[item.value]" v-else-if="item.type == 'checkbox'">
          <n-checkbox
            v-for="checkbox in item.options"
            :value="checkbox.value"
            :label="checkbox.label"
            :size="item.size"
          />
        </n-checkbox-group>

        <!-- 日期选择器 Date Picker -->
        <n-date-picker
          v-model:value="modalForm[item.value]"
          :type="item.type"
          v-else-if="item.type.indexOf('date') != -1"
        />
      </n-form-item>
    </n-form>
  </div>
</template>

<script setup>
const props = defineProps({
  /* 表单label宽度 */
  labelWidth: {
    type: Number,
    default: '80',
  },
  /* 表单禁用状态 */
  disabled: {
    type: Boolean,
    default: false,
  },
  /* 标签显示的位置*/
  labelPlacement: {
    type: String,
    default: 'left',
  },
  /* 标签的文本对齐方式 */
  labelAlign: {
    type: String,
    default: 'right',
  },
  /* 必填星号的位置 */
  markPlacement: {
    type: String,
    default: 'left',
  },
  /* 当前所要显示的表单字段 */
  formData: {
    type: Array,
    default: [],
  },
  // /* 当前form表单的id,用于查询详情信息 */
  // id: {
  //   type: String,
  //   default: '',
  // },
  /* 获取详情的api */
  getFormData: {
    type: Function,
    required: true,
  },
})
const modalForm = ref({})
/* 获取表单信息 */
async function getFormData(id) {
  const { data } = await props.getFormData({id})
  modalForm.value = data
}

// 抛出方法，让父级可以使用
defineExpose({
  getFormData,
})
</script>

<style lang="scss" scoped></style>
