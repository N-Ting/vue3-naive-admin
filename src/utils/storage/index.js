import { createStorage } from './storage'

const prefixKey = 'Vue_Naive_Admin_'

export const createLocalStorage = function (option = {}) {
  return createStorage({
    prefixKey: option.prefixKey || '',
    storage: localStorage,
  })
}

export const createSessionStorage = function (option = {}) {
  return createStorage({
    prefixKey: option.prefixKey || '',
    storage: sessionStorage,
  })
}
// LocalStorage
export const lStorage = createLocalStorage({ prefixKey })

// SessionStorage
export const sStorage = createSessionStorage({ prefixKey })
