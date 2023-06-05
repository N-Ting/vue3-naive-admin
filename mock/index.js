import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

// 直接引用modules文件中所有带js后缀的文件
const modules = import.meta.globEager('./modules/*.js')
const mockModules = []

Object.keys(modules).forEach((key) => {
  mockModules.push(...modules[key].default)
})

export function setupProdMockServer() {
    // 这个是用来注册mock的，当在生产中使用mock时，很重要
  createProdMockServer(mockModules)
}
