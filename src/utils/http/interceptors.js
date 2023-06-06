import { getToken } from '@/utils'
import { isNullOrUndef } from '@/utils'
import { isWithoutToken  } from './helpers'
//axios其请求成功时reqResolve服务器返回值
export function reqResolve(config) {
  // 防止缓存，给get请求加上时间戳
  if (config.method === 'get') {
    config.params = { ...config.params, t: new Date().getTime() }
  }

 // 处理不需要token的请求
 if (isWithoutToken(config)) {
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
  return response?.data
}

//axios其响应失败时resReject错误值
export function resReject(error) {
  let { code, message } = error.response?.data || {}
  if (isNullOrUndef(code)) {
    // 未知错误
    code = -1
    message = '接口异常！'
  } else {
    /**
     * TODO 此处可以根据后端返回的错误码自定义框架层面的错误处理
     */
    switch (code) {
      case 401:
        message = message || '登录已过期'
        break
      case 403:
        message = message || '没有权限'
        break
      case 404:
        message = message || '资源或接口不存在'
        break
      default:
        message = message || '未知异常'
        break
    }
  }
  console.error(`【${code}】 ${error}`)
  return Promise.resolve({ code, message, error })
}
