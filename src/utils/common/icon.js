import { h } from 'vue'
import { Icon } from '@iconify/vue'
import { NIcon } from 'naive-ui'
import SvgIcon from '@/components/icon/SvgIcon.vue'

// 渲染Icon的函数
export function renderIcon(icon, props = { size: 12 }) {
  return () => h(NIcon, props, { default: () => h(Icon, { icon }) })
}
// 渲染CustomIcon的函数
export function renderCustomIcon(icon, props = { size: 12 }) {
  return () => h(NIcon, props, { default: () => h(SvgIcon, { icon }) })
}
