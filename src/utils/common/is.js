const toString = Object.prototype.toString

/**
 * @description: 判断值是否为某个类型
 */
export function is(val, type) {
  return toString.call(val) === `[object ${type}]`
}

/**
 * @description: 是否已定义
 */
export function isDef(val) {
  return typeof val !== 'undefined'
}

/**
 * @description: 判断值是否为undefined
 */
export function isUndef(val) {
  return typeof val === 'undefined'
}

/**
 * @description: 判断值是否为null
 */
export function isNull(val) {
  return val === null
}

/**
 * @description: 判断值是否为空字符串
 */
export function isWhitespace(val) {
  return val === ''
}

/**
 * @description: 是否为对象
 */
export function isObject(val) {
  return !isNull(val) && is(val, 'Object')
}

/**
 * @description: 是否为数组
 */
export function isArray(val) {
  return val && Array.isArray(val)
}
/**
 * @description: 是否为字符串
 */
export function isString(val) {
  return is(val, 'String')
}
/**
 * @description: 是否为数字
 */
export function isNumber(val) {
  return is(val, 'Number')
}
/**
 * @description: 是否为布尔值
 */
export function isBoolean(val) {
  return is(val, 'Boolean')
}
/**
 * @description:  是否为时间
 */
export function isDate(val) {
  return is(val, 'Date')
}

/**
 * @description:  是否为正则
 */
export function isRegExp(val) {
  return is(val, 'RegExp')
}
/**
 * @description:  是否为函数
 */
export function isFunction(val) {
  return typeof val === 'function'
}

/**
 * @description:  是否为promise
 */
export function isPromise(val) {
  return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

/**
 * @description:  是否为Element
 */
export function isElement(val) {
  return isObject(val) && !!val.tagName
}

/**
 * @description: 是否为浏览器
 */
export function isWindow(val) {
  return typeof window !== 'undefined' && isDef(window) && is(val, 'Window')
}

/**
 * @description: 是否为null或者undefined
 */
export function isNullOrUndef(val) {
  return isNull(val) || isUndef(val)
}

/**
 * @description: 是否为null或者空字符串
 */
export function isNullOrWhitespace(val) {
  return isNullOrUndef(val) || isWhitespace(val)
}


/** 空数组 | 空字符串 | 空对象 | 空Map | 空Set */
export function isEmpty(val) {
  if (isArray(val) || isString(val)) {
    return val.length === 0
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0
  }

  return false
}

/**
 * * 类似mysql的IFNULL函数
 * * 第一个参数为null/undefined/'' 则返回第二个参数作为备用值，否则返回第一个参数
 * @param {Number|Boolean|String} val
 * @param {Number|Boolean|String} def
 * @returns
 */
export function ifNull(val, def = '') {
  return isNullOrWhitespace(val) ? def : val
}

export function isUrl(path) {
  const reg =
    /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/
  return reg.test(path)
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export const isServer = typeof window === 'undefined'

export const isClient = !isServer
