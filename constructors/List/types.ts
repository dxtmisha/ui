import { ComputedRef } from 'vue'

import {
  ComponentAssociativeType,
  ComponentBaseType,
  ComponentClassesType
} from '../types'

export type ListClassesType<T = ComponentAssociativeType> = ComponentClassesType<T>
export type ListSetupType = ComponentBaseType &
  {
    classes: ComputedRef<ListClassesType>
  }
