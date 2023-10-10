<template>
  <n-grid :cols="cols">
    <!-- span栅格占据的列数，为 0 的时候会隐藏 -->
    <n-gi v-for="(item, i) in formData" :span="item.span ? item.span : 1" :key="i">
      <n-form-item :label="item.label" :path="item.value" :rule="item.rule">
        <!-- 上传 accept 接受的文件类型 -->
        <n-upload
          action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
          :default-file-list="fileList"
          list-type="image-card"
          v-if="item.type.indexOf('upload') != -1"
          :accept="item.accept"
        >
          <!-- 图片上传 +样式 -->
          <i class="n-base-icon" v-if="item.type == 'upload-img'">
            <svg
              width="512"
              height="512"
              viewBox="0 0 512 512"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M256 112V400M400 256H112"
                stroke="currentColor"
                stroke-width="32"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </i>
          <!-- 文件上传 按钮样式 -->
          <n-button v-if="item.type == 'upload-file'">上传文件</n-button>
        </n-upload>
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
        <!-- 树形选择 -->
        <n-tree-select
          :options="item.options"
          @update:value="handleUpdateValue"
          v-else-if="item.type == 'tree-select'"
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
    </n-gi>
  </n-grid>
</template>

<script setup>
const props = defineProps({
  /* 显示的栅格数量 */
  cols: {
    type: Number,
    default: 1,
  },
  /* 当前所要显示的表单字段 */
  formData: {
    type: Array,
    default: [],
  },

  /* form的表单数据 */
  modalForm: {
    type: Object,
    default: {},
  },
})
</script>

<style lang="scss" scoped></style>
