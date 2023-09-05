import { defAxios as request } from '@/utils/http'

export const login = (data) => {
  return request({
    url: '/public/admin/login',
    method: 'post',
    data,
  })
}

export const refreshToken = () => {
  return request({
    url: '/auth/refreshToken',
    method: 'post',
  })
}
