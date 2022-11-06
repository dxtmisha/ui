import { ComputedRef, Ref } from 'vue'

export type NumberOrStringType = number | string

export type AssociativeType<T = any> = {
  [key: NumberOrStringType]: T
}
export type AssociativeOrArrayType<T = any> = T[] | AssociativeType<T> | object

export type ElementType = Window | HTMLElement | Element

export type RefOrNormalType<T = any> = ComputedRef<T> | Ref<T> | T
export type RefOrElementType = RefOrNormalType<ElementType>

export type InstallOptionsType = {
  designs?: AssociativeType[]
}

export type EventCallbackType<R = any> = (event?: Event) => R
export type EventOptionsType = AddEventListenerOptions | boolean | undefined

export type ComponentAssociativeValueType = (() => boolean) | boolean
export type ComponentAssociativeRefType = RefOrNormalType<ComponentAssociativeValueType>
export type ComponentAssociativeType = AssociativeType<ComponentAssociativeRefType>
export type ComponentAssociativeItemsType = AssociativeType<ComponentAssociativeType>
export type ComponentValueType = RefOrNormalType<string>
export type ComponentBaseType = {
  name: ComputedRef<string>
  nameDesign: ComputedRef<string>
  baseClass: ComputedRef<string>
}
export type ComponentClassesType = {
  main: ComponentAssociativeType
  [key: NumberOrStringType]: ComponentAssociativeType
}
export type ComponentStyleItemType = AssociativeType<ComponentValueType>
export type ComponentStylesType = {
  main: ComponentStyleItemType
  [key: NumberOrStringType]: ComponentStyleItemType
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
