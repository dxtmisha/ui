import { ComputedRef } from 'vue'

import {
  AssociativeOrArrayType,
  AssociativeType,
  BooleanOrNumberOrStringType,
  ComponentAssociativeType,
  ComponentBaseType,
  ComponentClassesType,
  NumberOrStringType,
  RefOrNormalType
} from '../types'

export type ListValueType = AssociativeOrArrayType<AssociativeType | BooleanOrNumberOrStringType>
export type ListValuesType = RefOrNormalType<ListValueType>

export type ListItemType = {
  value: any
  text?: NumberOrStringType
  [key: NumberOrStringType]: any
}
export type ListDataType = ListItemType[]

export type ListClassesType<T = ComponentAssociativeType> = ComponentClassesType<T>
export type ListSetupType = ComponentBaseType &
  {
    classes: ComputedRef<ListClassesType>
    listBind: ComputedRef<ListDataType>
  }
