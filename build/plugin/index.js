import vue from '@vitejs/plugin-vue'

/**
 * * 扩展setup插件，支持在script标签中使用name属性
 * usage: <script setup name="MyComp"></script>
 */
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

// rollup打包分析插件,一下引用方式为5.7版本以上
import {visualizer} from 'rollup-plugin-visualizer'

//集成
import { configHtmlPlugin } from './html'
// 集成unocss
import { unocss } from './unocss'

/**
 * * 组件库按需引入插件
 * usage: 直接使用组件,无需在任何地方导入组件
 */
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

import { configMockPlugin } from './mock'

import unplugin from './unplugin'

export function createVitePlugins(viteEnv, isBuild) {
  const plugins = [
    vue(),
    ...unplugin,
    VueSetupExtend(),
    configHtmlPlugin(viteEnv, isBuild),
    unocss(),
  ]

  if (viteEnv?.VITE_USE_MOCK) {
    plugins.push(configMockPlugin(isBuild))
  }
  if (isBuild) {
    plugins.push(
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      })
    )
  }


  return plugins
}