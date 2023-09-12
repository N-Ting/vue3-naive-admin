import { defAxios as request } from '@/utils/http' //as别名

export function getUsers(data = {}) {
  return request({
    url: '/users',
    method: 'get',
    data,
  })
}

export function getUser(id) {
  if (id) {
    return request({
      url: `/user/${id}`,
      method: 'get',
    })
  }
  return request({
    url: '/private/menus/menuPermission',
    method: 'post',
  })
}

export function saveUser(data = {}, id) {
  if (id) {
    return request({
      url: '/user',
      method: 'put',
      data,
    })
  }

  return request({
    url: `/user/${id}`,
    method: 'put',
    data,
  })
}
