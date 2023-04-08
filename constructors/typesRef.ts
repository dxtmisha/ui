import { ComputedRef, PropType, Ref } from 'vue'
import {
  AssociativeType,
  CallbackNullType,
  CallbackOrBooleanType,
  ElementType,
  ImageTypeValueType,
  NumberOrStringType
} from './types'

/**
 * Basic types for working with reactive data
 *
 * Базовый типы для работа с реактивный данными
 */
export type RefType<T = any> = ComputedRef<T> | Ref<T>
export type RefAssociativeType<T = any> = AssociativeType<RefType<T>>
export type RefOrNormalType<T = any> = RefType<T> | T
export type RefOrCallbackType<T = any> = RefType<T> | CallbackNullType<T>
export type RefOrStringType = RefOrNormalType<string>
export type RefOrElementType<T = ElementType> = RefOrNormalType<T>

/**
 * Callback
 */
export type CallbackEmitType = (type: string, options?: AssociativeType | any) => void
export type CallbackBindType<T = any, R = AssociativeType> =
  ((value: Ref<T | R>) => ComputedRef<R>) &
  ((value: Ref<T | R>, name: string) => ComputedRef<R>) &
  ((value: Ref<T | R>, extra: RefOrNormalType<AssociativeType>) => ComputedRef<R>) &
  ((value: Ref<T | R>, extra: RefOrNormalType<AssociativeType>, name: string) => ComputedRef<R>)

/**
 * Component
 */
export type ComponentValueType = RefOrStringType

export type ComponentAssociativeValueType = CallbackOrBooleanType
export type ComponentAssociativeRefType = RefOrNormalType<ComponentAssociativeValueType>
export type ComponentAssociativeType = AssociativeType<ComponentAssociativeRefType>
export type ComponentAssociativeItemsType = AssociativeType<ComponentAssociativeType>

export interface ComponentPropOptionsType<T = any, D = T> {
  type?: PropType<T> | true | null
  required?: boolean
  default?: D | null | undefined | object

  validator? (value: unknown): boolean
}

/**
 * Classes
 */
export interface ComponentClassesType<T = ComponentAssociativeType> extends AssociativeType<T> {
  main: T
}

/**
 * Styles
 */
export type ComponentStyleItemType = AssociativeType<ComponentValueType>

export interface ComponentStylesType<T = ComponentStyleItemType> extends AssociativeType<T> {
  main: T
}

/**
 * Properties
 */
export interface ComponentPropertyType {
  index: string
  className: string
  classStyle: string
  classValue: string
  values?: string[]
}

export type ComponentPropertiesType = AssociativeType<ComponentPropertyType>

/**
 * Setup
 */
export interface ComponentBaseType<E = RefOrElementType> {
  element: Ref<E | undefined>
  name: string
  design: string
  className: string
  classes?: ComputedRef<ComponentClassesType>
  styles?: ComputedRef<ComponentStylesType>
}

export type ImageCoordinatorType = Ref<[number, number, number, number] | undefined>
export type ImageOptionType = Ref<NumberOrStringType | undefined>
export type ImageTypeType = ComputedRef<ImageTypeValueType>
export type ImageValueType = Ref<string | File>

export type GeoCodeType = RefOrNormalType<string>
