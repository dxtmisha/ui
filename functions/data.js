'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.toReplaceTemplate = exports.toKebabCase = exports.toCamelCase = exports.strFill = exports.replaceRecursive = exports.random = exports.minListLength = exports.maxListLength = exports.isSelectedByList = exports.isSelected = exports.isFilled = exports.getExp = exports.getClipboardData = exports.forEach = exports.executeFunction = exports.arrFill = void 0
function arrFill (value, count) {
  return Array(count).fill(value)
}
exports.arrFill = arrFill
function executeFunction (callback) {
  return callback instanceof Function ? callback() : callback
}
exports.executeFunction = executeFunction
function forEach (data, callback, filterUndefined) {
  if (data && typeof data === 'object') {
    const returnData = []
    if (Array.isArray(data)) {
      data.forEach((item, key) => returnData.push(callback(item, key, data)))
    } else {
      Object.entries(data).forEach(([key, item]) => returnData.push(callback(item, key, data)))
    }
    if (filterUndefined) {
      return returnData.filter((item) => item !== undefined)
    } else {
      return returnData
    }
  } else {
    return []
  }
}
exports.forEach = forEach
async function getClipboardData (event) {
  return event?.clipboardData?.getData('text') || await navigator.clipboard.readText() || ''
}
exports.getClipboardData = getClipboardData
function getExp (value, flags = 'ig', pattern = ':value') {
  const data = value.replace(/([[\]\\^$.?*+()])/ig, '\\$1')
  return new RegExp(pattern.replace(':value', data), flags)
}
exports.getExp = getExp
function isFilled (value) {
  if (value) {
    switch (typeof value) {
      case 'bigint':
      case 'number':
        return value !== 0
      case 'boolean':
        return value
      case 'function':
      case 'symbol':
        return true
      case 'object':
        if (Array.isArray(value)) {
          return value.length > 0
        } else {
          return Object.entries(value).length > 0
        }
      case 'string':
        return value !== ''
      case 'undefined':
        return false
      default:
        return !!value
    }
  }
  return false
}
exports.isFilled = isFilled
function isSelected (value, selected) {
  if (Array.isArray(selected)) {
    return selected.indexOf(value) !== -1
  } else if (value === undefined) {
    return false
  } else {
    return value === selected
  }
}
exports.isSelected = isSelected
function isSelectedByList (values, selected) {
  if (Array.isArray(values)) {
    return values.reduce((value, currentValue) => currentValue && isSelected(value, selected))
  } else {
    return isSelected(values, selected)
  }
}
exports.isSelectedByList = isSelectedByList
function maxListLength (data) {
  return forEach(data, item => item.length)
    ?.sort((a, b) => a > b ? -1 : 1)?.[0]
}
exports.maxListLength = maxListLength
function minListLength (data) {
  return forEach(data, item => item.length)
    ?.sort()?.[0]
}
exports.minListLength = minListLength
function random (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
exports.random = random
function replaceRecursive (array, replacement, isMerge = true) {
  if (typeof array === 'object' &&
        isFilled(replacement)) {
    forEach(replacement, (item, index) => {
      const data = array?.[index]
      if (data &&
                item &&
                typeof data === 'object' &&
                typeof item === 'object') {
        if (isMerge &&
                    Array.isArray(data) &&
                    Array.isArray(item)) {
          data.push(...item)
        } else if (Array.isArray(data)) {
          array[index] = replaceRecursive(replaceRecursive({}, data), item)
        } else {
          replaceRecursive(data, item)
        }
      } else {
        if (Array.isArray(item)) {
          array[index] = [...item]
        } else {
          array[index] = typeof item === 'object' ? JSON.parse(JSON.stringify(item)) : item
        }
      }
    })
  }
  return array
}
exports.replaceRecursive = replaceRecursive
function strFill (value, count) {
  return arrFill(value, count).join('')
}
exports.strFill = strFill
function toCamelCase (value) {
  return value
    .toString()
    .replace(/[-.]([a-z])/g, (all, char) => `${char.toUpperCase()}`)
}
exports.toCamelCase = toCamelCase
function toKebabCase (value) {
  return value
    .toString()
    .replace(/^[A-Z]/g, all => all.toLowerCase())
    .replace(/[A-Z]/g, all => `-${all.toLowerCase()}`)
}
exports.toKebabCase = toKebabCase
function toReplaceTemplate (value, replaces) {
  let data = value
  forEach(replaces, (replacement, pattern) => {
    data = data.replace(`[${pattern}]`, replacement)
  })
  return data
}
exports.toReplaceTemplate = toReplaceTemplate
exports.default = {
  arrFill,
  executeFunction,
  forEach,
  getClipboardData,
  getExp,
  isFilled,
  isSelected,
  isSelectedByList,
  maxListLength,
  minListLength,
  random,
  replaceRecursive,
  strFill,
  toCamelCase,
  toKebabCase,
  toReplaceTemplate
}
// # sourceMappingURL=data.js.map
