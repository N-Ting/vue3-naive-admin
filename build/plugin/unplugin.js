import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite' //解决在开发中导入问题，路径不清楚的情况下
import Components from 'unplugin-vue-components/vite' //vue的按需组件自动导入 默认将src/components 路径下导入组件
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'

/**
 * * unplugin-icons插件，自动引入iconify图标
 * usage: https://github.com/antfu/unplugin-icons
 * 图标库: https://icones.js.org/
 */
import Icons from 'unplugin-icons/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

import { getSrcPath } from '../utils'

const customIconPath = resolve(getSrcPath(), 'assets/svg')

export default [
 
  AutoImport({
     // 自动导入 Vue 相关函数，如：ref, reactive, toRef, useRoute, useRouter 等
    imports: ['vue', 'vue-router'],
    dts: false, 
  }),
  Icons({
    compiler: 'vue3',
    customCollections: {
      custom: FileSystemIconLoader(customIconPath),
    },
    scale: 1,
    defaultClass: 'inline-block',
  }),
  Components({
    resolvers: [
      NaiveUiResolver(),
      IconsResolver({ customCollections: ['custom'], componentPrefix: 'icon' }),
    ],
    dts: false,
  }),
  createSvgIconsPlugin({
    iconDirs: [customIconPath],    // 指定 SVG图标 保存的文件夹路径
    symbolId: 'icon-custom-[dir]-[name]',  // 指定 使用svg图标的格式
    inject: 'body-last',  //svgDom默认插入位置
    customDomId: '__CUSTOM_SVG_ICON__',  //自定义dom id
  }),
]
