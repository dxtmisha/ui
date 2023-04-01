'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.toReplaceTemplate = exports.toKebabCase = exports.replaceRecursive = exports.random = exports.minListLength = exports.maxListLength = exports.isSelectedByList = exports.isSelected = exports.isIntegerBetween = exports.isFilled = exports.getExp = exports.getColumn = exports.getClipboardData = exports.strFill = exports.arrFill = exports.forEach = exports.executeFunction = void 0
/**
 * The function is executed and returns its result. Or returns the
 * input data, if it is not a function
 *
 * Выполняется функция и возвращает ее результат. Или возвращает входные
 * данные, если это не функция
 * @param callback function or any value / функция или любое значение
 */
function executeFunction (callback) {
  return callback instanceof Function ? callback() : callback
}
exports.executeFunction = executeFunction
/**
 * The function performs the specified function once for each element in the object. And returns
 * an array with the results of executing the function
 *
 * Функция выполняет указанную функцию один раз для каждого элемента в объекте. И возвращает
 * массив с результатами выполнения функции
 * @param data object for iteration / объект для перебора
 * @param callback a function to execute for each element in the array / функция,
 * которая будет вызвана для каждого элемента
 * @param filterUndefined removal of all records with the value undefined / удаление
 * всех записей со значением undefined
 */
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
/**
 * The method creates an array of "count" elements with values equal to "value"
 *
 * Метод создает массив из "count" элементов со значениями равными "value"
 * @param value value to fill the array with / значение, заполняющее массив
 * @param count the number of elements in that array / число элементов этого массива
 */
function arrFill (value, count) {
  return Array(count).fill(value)
}
exports.arrFill = arrFill
/**
 * The method creates a string of length equal to "count" with characters "value"
 *
 * Метод создает строку длиной равной count с символами "value"
 * @param value character for filling / символ для заполнения
 * @param count length of the string / длина строки
 */
function strFill (value, count) {
  return arrFill(value, count).join('')
}
exports.strFill = strFill
async function getClipboardData (event) {
  return event?.clipboardData?.getData('text') || await navigator.clipboard.readText() || ''
}
exports.getClipboardData = getClipboardData
function getColumn (array, column) {
  return forEach(array, item => item?.[column])
}
exports.getColumn = getColumn
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
function isIntegerBetween (value, between) {
  return value === Math.ceil(between) || value === Math.floor(between)
}
exports.isIntegerBetween = isIntegerBetween
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
  // Function
  executeFunction,
  // Array
  arrFill,
  // String
  strFill,
  // Other
  forEach,
  getClipboardData,
  getColumn,
  getExp,
  isFilled,
  isIntegerBetween,
  isSelected,
  isSelectedByList,
  maxListLength,
  minListLength,
  random,
  replaceRecursive,
  // toCamelCase,
  toKebabCase,
  toReplaceTemplate
}
// # sourceMappingURL=data.js.map
