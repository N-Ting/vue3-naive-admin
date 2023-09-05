import { lStorage } from '@/utils'

const USER_INFO = 'access_user'
const DURATION = 6 * 60 * 60

export function getUserInfo() {
  return lStorage.get(USER_INFO)
}

export function setUserInfo(userInfo) {
  lStorage.set(USER_INFO, userInfo, DURATION)
}

export function removeUserInfo() {
  lStorage.remove(USER_INFO)
}
