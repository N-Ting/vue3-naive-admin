import { getToken, toLogin } from '@/utils'
import { isNullOrUndef } from '@/utils'
import { resolveResError } from './helpers'
//axios其请求成功时reqResolve服务器返回值
export function reqResolve(config) {
  // 防止缓存，给get请求加上时间戳
  if (config.method === 'get') {
    config.params = { ...config.params, t: new Date().getTime() }
  }
  // 处理不需要token的请求
  if (config.noNeedToken) {
    return config
  }
  const token = getToken()
  if (!token) {
    /**
     * * 未登录或者token过期的情况下
     * * 跳转登录页重新登录，携带当前路由及参数，登录成功会回到原来的页面
     */
    toLogin()
    return Promise.reject({ code: '-1', message: '未登录' })
  }

  /**
   * * jwt token
   * ! 认证方案: Bearer
   */
  config.headers.Authorization = config.headers.Authorization || 'Bearer ' + token

  return config
}

//axios其请求失败时reject错误值
export function reqReject(error) {
  return Promise.reject(error)
}
 
//axios其响应成功时resResolve服务器返回值
export function resResolve(response) {
   // return response?.data
  // TODO: 处理不同的 response.headers
  const { data, status, config, statusText } = response
  if (data?.code !== 200) {
    const code = data?.code ?? status

    /** 根据code处理对应的操作，并返回处理后的message */
    const message = resolveResError(code, data?.message ?? statusText)

    /** 需要错误提醒 */
    !config.noNeedTip && window.$message?.error(message)
    return Promise.reject({ code, message, error: data || response })
  }
  return Promise.resolve(data)
}

//axios其响应失败时resReject错误值
export function resReject(error) {
  if (!error || !error.response) {
    const code = error?.code
    /** 根据code处理对应的操作，并返回处理后的message */
    const message = resolveResError(code, error.message)
    window.$message?.error(message)
    return Promise.reject({ code, message, error })
  }
  const { data, status, config } = error.response
  const code = data?.code ?? status
  const message = resolveResError(code, data?.message ?? error.message)
  /** 需要错误提醒 */
  !config?.noNeedTip && window.$message?.error(message)
  return Promise.reject({ code, message, error: error.response?.data || error.response })
}
