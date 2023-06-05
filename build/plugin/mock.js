import { viteMockServe } from 'vite-plugin-mock'

export function configMockPlugin(isBuild) {
  return viteMockServe({
    mockPath: 'mock/modules',  //mock文件路径，在根路径下创建一个mock文件
    localEnabled: !isBuild, //mock开关
    prodEnabled: isBuild, //生产环境下为false，这样就不会被打包到生产包中
    injectCode: `
      import { setupProdMockServer } from '../mock';
      setupProdMockServer();
    `,//如果生产环境开启了 mock 功能,即prodEnabled=true.则该代码会被注入到injectFile对应的文件的底部。默认为main.{ts,js}
  })
}
