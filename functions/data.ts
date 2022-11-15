import { AssociativeOrArrayType, AssociativeType, NumberOrStringType } from '../constructors/types'

export function executeFunction<T = any> (callback: T | (() => T)): T {
  return callback instanceof Function ? callback() : callback
}

export function forEach<T, K = NumberOrStringType, R = undefined> (
  data: AssociativeOrArrayType<T>,
  callback: (item: T, key: K, data: AssociativeOrArrayType<T>) => R,
  filterUndefined?: boolean
): Array<R> {
  if (data && typeof data === 'object') {
    const returnData = [] as Array<R>

    if (Array.isArray(data)) {
      data.forEach((item, key) => returnData.push(callback(item, key as K, data)))
    } else {
      Object.entries(data).forEach(([key, item]) => returnData.push(callback(item, key as K, data)))
    }

    if (filterUndefined) {
      return returnData.filter((item: R | undefined) => item !== undefined)
    } else {
      return returnData
    }
  } else {
    return []
  }
}

export function getExp (
  value: string,
  flags = 'ig' as string,
  pattern = ':value' as string
): RegExp {
  const data = value.replace(/([[\]\\^$.?*+()])/ig, '\\$1')

  return new RegExp(pattern.replace(':value', data), flags)
}

export function isFilled<T = any> (value: T): boolean {
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

export function replaceRecursive<T = any> (
  array: AssociativeType<T>,
  replacement?: AssociativeOrArrayType<T>,
  isMerge = true as boolean
): AssociativeType<T> {
  if (
    typeof array === 'object' &&
    isFilled(replacement)
  ) {
    forEach(replacement as AssociativeType<T>, (item, index) => {
      const data = array?.[index] as T

      if (
        data &&
        item &&
        typeof data === 'object' &&
        typeof item === 'object'
      ) {
        if (
          isMerge &&
          Array.isArray(data) &&
          Array.isArray(item)
        ) {
          data.push(...item)
        } else if (Array.isArray(data)) {
          array[index] = replaceRecursive<T>(
            replaceRecursive<T>({}, data),
            item
          ) as T
        } else {
          replaceRecursive<T>(
            data as AssociativeType<T>,
            item
          )
        }
      } else {
        if (Array.isArray(item)) {
          array[index] = [...item] as T
        } else {
          array[index] = typeof item === 'object' ? { ...item } : item
        }
      }
    })
  }

  return array
}

export function toCamelCase (value: NumberOrStringType): string {
  return value
    .toString()
    .replace(/[-.]([a-z])/g, (all, char) => `${char.toUpperCase()}`)
}

export function toKebabCase (value: NumberOrStringType): string {
  return value
    .toString()
    .replace(/^[A-Z]/g, all => all.toLowerCase())
    .replace(/[A-Z]/g, all => `-${all.toLowerCase()}`)
}

export default {
  executeFunction,
  forEach,
  getExp,
  isFilled,
  replaceRecursive,
  toCamelCase,
  toKebabCase
}
