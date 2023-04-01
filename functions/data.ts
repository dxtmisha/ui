import { AssociativeOrArrayType, AssociativeType, NumberOrStringType } from '../constructors/types'

/**
 * The function is executed and returns its result. Or returns the
 * input data, if it is not a function
 *
 * Выполняется функция и возвращает ее результат. Или возвращает входные
 * данные, если это не функция
 * @param callback function or any value / функция или любое значение
 */
export function executeFunction<T = any> (callback: T | (() => T)): T {
  return callback instanceof Function ? callback() : callback
}

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

/**
 * The method creates an array of "count" elements with values equal to "value"
 *
 * Метод создает массив из "count" элементов со значениями равными "value"
 * @param value value to fill the array with / значение, заполняющее массив
 * @param count the number of elements in that array / число элементов этого массива
 */
export function arrFill<T = any> (value: T, count: number): T[] {
  return Array(count).fill(value)
}

/**
 * The method creates a string of length equal to "count" with characters "value"
 *
 * Метод создает строку длиной равной count с символами "value"
 * @param value character for filling / символ для заполнения
 * @param count length of the string / длина строки
 */
export function strFill (value: string, count: number): string {
  return arrFill<string>(value, count).join('')
}

export async function getClipboardData (event: ClipboardEvent): Promise<string> {
  return event?.clipboardData?.getData('text') || await navigator.clipboard.readText() || ''
}

export function getColumn<T = any> (array: AssociativeOrArrayType, column: string): T[] {
  return forEach(array, item => item?.[column])
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

export function isIntegerBetween (value: number, between: number): boolean {
  return value === Math.ceil(between) || value === Math.floor(between)
}

export function isSelected (value: any, selected: any | any[]): boolean {
  if (Array.isArray(selected)) {
    return selected.indexOf(value) !== -1
  } else if (value === undefined) {
    return false
  } else {
    return value === selected
  }
}

export function isSelectedByList (values: any | any[], selected: any | any[]): boolean {
  if (Array.isArray(values)) {
    return values.reduce((value, currentValue) => currentValue && isSelected(value, selected))
  } else {
    return isSelected(values, selected)
  }
}

export function maxListLength (data: AssociativeOrArrayType<string>): number {
  return forEach<string, number, number>(data, item => item.length)
    ?.sort((a: number, b: number) => a > b ? -1 : 1)
    ?.[0]
}

export function minListLength (data: AssociativeOrArrayType<string>): number {
  return forEach<string, number, number>(data, item => item.length)
    ?.sort()
    ?.[0]
}

export function random (min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
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
          array[index] = typeof item === 'object' ? JSON.parse(JSON.stringify(item)) : item
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

export function toReplaceTemplate (value: string, replaces: AssociativeType<string>): string {
  let data = value

  forEach<string, string, void>(replaces, (replacement, pattern) => {
    data = data.replace(`[${pattern}]`, replacement)
  })

  return data
}

export default {
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
  toCamelCase,
  toKebabCase,
  toReplaceTemplate
}
