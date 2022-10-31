import {ComputedRef, Ref} from "vue";

export type NumberOrStringType = number | string

export type AssociativeType<T = any> = {
  [key: NumberOrStringType]: T
}
export type AssociativeOrArrayType<T = any> = T[] | AssociativeType<T> | object

export type RefOrNormalType<T = any> = ComputedRef<T> | Ref<T> | T

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
  height: number,
  width: number,
  src: string
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
