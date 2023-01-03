import { ComputedRef, PropType, Ref } from 'vue'

export type NumberOrStringType = number | string
export type CallbackType<T = any, R = any> = (value: T) => R
export type CallbackNullType<R = void> = () => R

export type AssociativeType<T = any> = {
  [key: NumberOrStringType]: T
}
export type AssociativeOrArrayType<T = any> = T[] | AssociativeType<T> | object

export type ElementType = Window | HTMLElement | Element

export type RefType<T = any> = ComputedRef<T> | Ref<T>
export type RefOrCallbackType<T = any> = RefType<T> | CallbackNullType<T>
export type RefOrNormalType<T = any> = ComputedRef<T> | Ref<T> | T
export type RefOrElementType<T = ElementType> = RefOrNormalType<T>

export type InstallOptionsType = {
  designs?: AssociativeType[]
}

export type EventCallbackType<R = any, E = Event> = (event?: E) => R
export type EventCallbackRequiredType<R = any, E = Event> = (event: E) => R
export type EventOptionsType = AddEventListenerOptions | boolean | undefined

export type ComponentAssociativeValueType = (() => boolean) | boolean
export type ComponentAssociativeRefType = RefOrNormalType<ComponentAssociativeValueType>
export type ComponentAssociativeType = AssociativeType<ComponentAssociativeRefType>
export type ComponentAssociativeItemsType = AssociativeType<ComponentAssociativeType>
export type ComponentValueType = RefOrNormalType<string>
export type ComponentClassesType = {
  main: ComponentAssociativeType
  [key: NumberOrStringType]: ComponentAssociativeType
}
export type ComponentPropOptionsType<T = any, D = T> = {
  type?: PropType<T> | true | null
  required?: boolean
  default?: D | null | undefined | object
  validator? (value: unknown): boolean
}
export type ComponentPropertyType = {
  index: string
  className: string
  classStyle: string
  classValue: string
  values?: string[]
}
export type ComponentPropertiesType = AssociativeType<ComponentPropertyType>
export type ComponentStyleItemType = AssociativeType<ComponentValueType>
export type ComponentStylesType = {
  main: ComponentStyleItemType
  [key: NumberOrStringType]: ComponentStyleItemType
}

export type ComponentBaseType = {
  element: Ref<RefOrElementType | undefined>
  name: string
  design: string
  className: string
  classes?: ComputedRef<ComponentClassesType>
  styles?: ComputedRef<ComponentStylesType>
}
export type ComponentItemType =
  ComputedRef<ComponentValueType>
  | ComputedRef<ComponentValueType[]>
  | ComputedRef<ComponentAssociativeType>
  | Ref<ComponentValueType>
  | Ref<ComponentValueType[]>
  | Ref<ComponentAssociativeType>
  | ComponentValueType
  | ComponentValueType[]
  | ComponentAssociativeType

export type ElementOptionsItemType = (() => string) | string
export type ElementOptionsType =
  CallbackType<HTMLElement, void>
  | AssociativeType<ElementOptionsItemType>
  | undefined

export type ImageCoordinatorType = Ref<[number, number, number, number] | undefined>
export type ImageItemType = {
  image: HTMLImageElement
  src: string
  width: number
  height: number
}
export type ImageItemSizeType = {
  width: number
  height: number
}
export type ImageOptionType = Ref<NumberOrStringType | undefined>
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
export type ImageTypeType = ComputedRef<ImageTypeValueType>
export type ImageValueType = Ref<string | File>

export type GeoType = {
  country: string
  countryAlternative?: string[]
  firstDay?: string | null
  language: string
  languageAlternative?: string[]
  phone?: string
  phoneMask?: string | string[]
  zone: string | null
}
