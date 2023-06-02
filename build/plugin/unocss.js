
// 出自antfu的原子化css
import Unocss from 'unocss/vite'
import { presetUno, presetAttributify, presetIcons } from 'unocss'

export function unocss() {
  return Unocss({
    presets: [presetUno(), presetAttributify(), presetIcons()],
  })
}