/**
 * Division by types
 *
 * Разделения на типы
 */
export type AnyOrUndefinedType<T = any> = T | undefined
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

export interface ItemType<T = any> {
  text: string
  value: T
}

/**
 * Types for working with events
 *
 * Типы для работы с событиями
 */
export type EventOptionsType = AddEventListenerOptions | boolean | undefined
export type EventCallbackType<R = any, E = Event> = (event?: E) => R
export type EventCallbackRequiredType<R = any, E = Event> = (event: E) => R

/**
 * Types for working with home elements
 *
 * Типы для работы с элементами дома
 */
export type ElementType = Window | HTMLElement | Element
export type ElementOptionsItemType = CallbackOrStringType
export type ElementOptionsType =
  CallbackType<HTMLElement, void>
  | AssociativeType<ElementOptionsItemType>
  | undefined

/**
 * Types for working with images
 *
 * Типы для работы с картинами
 */
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

export interface ImageItemSizeType<T = number> {
  width: T
  height: T
}

export interface ImageItemType extends ImageItemSizeType {
  image: HTMLImageElement
  src: string
}

/**
 * Types for working with location
 *
 * Типы для работы с локацией
 */
export type GeoDateType = 'datetime' | 'date' | 'month' | 'time' | 'second'
export type GeoFirstDayType = 1 | 6 | 0
export type GeoHoursType = '12' | '24'
export type GeoTimeZoneStyleType = 'minute' | 'hour' | 'ISO8601' | 'RFC'

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

export interface FlagItemType {
  icon: string
  country: string
  language: string
  value: string
}

export interface GeoPhoneInfoType extends FlagItemType {
  phone?: number
  mask: string[]
}

export interface GeoPhoneMapType {
  code: string | undefined
  info: GeoPhoneInfoType | undefined
  mask: string[]
  maskFull: string[]
  next: AssociativeType<GeoPhoneMapType>
}

export interface GeoPhoneItemType {
  item: GeoPhoneMapType | undefined
  value: string
}

/**
 * Types for working with input validity
 *
 * Типы для работы с валидностью input
 */
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
 * Types for working with users
 *
 * Типы для работы с пользователями
 */
export interface UserType {
  id: number | string
  login: string
  name?: string
  avatar?: string

  [key: number | string]: any
}

/**
 * Installation interface
 *
 * Установочный интерфейс
 */
export interface InstallOptionsType {
  designs?: AssociativeType[]
}
