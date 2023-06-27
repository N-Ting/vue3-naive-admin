import axios from 'axios'
import { resResolve, resReject, reqResolve, reqReject } from './interceptors'

export function createAxios(options = {}) {
  const defaultOptions = {
    baseURL: import.meta.env.VITE_APP_BASE_API, // 基础请求地址
    timeout: 12000, // 请求超时设置
  }

  
// 创建 axios 请求实例
  const service = axios.create({
    ...defaultOptions,
    ...options,
  })
  //添加请求拦截器
  service.interceptors.request.use(reqResolve, reqReject)
  //添加响应拦截器
  service.interceptors.response.use(resResolve, resReject)
  return service
}

export const defAxios = createAxios()

//  测试时的baseURL
export const testAxios = createAxios({
  baseURL: import.meta.env.VITE_APP_BASE_API_TEST,
})
