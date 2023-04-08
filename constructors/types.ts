/**
 * Division by types
 *
 * Разделения на типы
 */
export type NumberOrUndefinedType = number | undefined
export type NumberOrStringType = number | string
export type BooleanOrNumberOrStringType = boolean | number | string
export type NumberOrStringOrDateType = NumberOrStringType | Date

/**
 * Types of functions
 *
 * Типы функций
 */
export type CallbackType<T = any, R = any> = (value: T) => R
export type CallbackVoidType<T = any> = (value: T) => void
export type CallbackNullType<R = void> = () => R

export type CallbackOrAnyType<R = any> = CallbackNullType<R> | R
export type CallbackOrBooleanType = CallbackOrAnyType<boolean>
export type CallbackOrStringType = CallbackOrAnyType<string>

/**
 * Array or any other value
 *
 * Массив или любое другое значение
 */
export type ArrayOrAnyType<T = any> = T[] | T
export type ArrayOrStringType = ArrayOrAnyType<string>

/**
 * Associative array
 *
 * Ассоциативный массив
 */
export interface AssociativeType<T = any> {
  [key: NumberOrStringType]: T
}

export type AssociativeStringType = AssociativeType<string>

export type AssociativeOrAnyType<T = any> = AssociativeType<T> | T
export type AssociativeOrArrayType<T = any> = T[] | AssociativeType<T> | object
export type AssociativeOrStringType = AssociativeOrAnyType<string>

/**
 * Event
 */
export type EventOptionsType = AddEventListenerOptions | boolean | undefined
export type EventCallbackType<R = any, E = Event> = (event?: E) => R
export type EventCallbackRequiredType<R = any, E = Event> = (event: E) => R

/**
 * Element
 */
export type ElementType = Window | HTMLElement | Element
export type ElementOptionsItemType = CallbackOrStringType
export type ElementOptionsType =
  CallbackType<HTMLElement, void>
  | AssociativeType<ElementOptionsItemType>
  | undefined

export interface ImageItemType {
  image: HTMLImageElement
  src: string
  width: number
  height: number
}

export interface ImageItemSizeType<T = number> {
  width: T
  height: T
}

export type ImageTypeValueType =
  'file'
  | 'image'
  | 'color'
  | 'public'
  | 'la'
  | 'lab'
  | 'filled'
  | 'outlined'
  | 'round'
  | 'sharp'
  | 'two-tone'
  | 'material'

export interface ItemType<T = any> {
  text: string
  value: T
}

export interface GeoType {
  country: string
  countryAlternative?: string[]
  firstDay?: string | null
  language: string
  languageAlternative?: string[]
  phone?: string
  phoneMask?: string | string[]
  zone: string | null
}

export type GeoDateType = 'datetime' | 'date' | 'month' | 'time' | 'second'
export type GeoFirstDayType = 1 | 6 | 0
export type GeoHoursType = '12' | '24'
export type GeoTimeZoneStyleType = 'minute' | 'hour' | 'ISO8601' | 'RFC'

export interface UserType {
  id: number | string
  login: string
  name?: string
  avatar?: string

  [key: number | string]: any
}

export interface ValidationType {
  checkValidity: boolean
  isValue?: boolean
  value?: NumberOrStringType
  detail?: AssociativeType
  required?: boolean
  validation?: AssociativeType
  validationMessage?: string
  input?: HTMLInputElement
}

/**
 * Установочный интерфесь
 */
export interface InstallOptionsType {
  designs?: AssociativeType[]
}
