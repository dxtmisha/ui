import { ComputedRef } from 'vue'
import { ComponentAssociativeType, ComponentBaseType, ComponentClassesType } from '../types'

export type FieldClassesType<T = ComponentAssociativeType> = ComponentClassesType<T> & {
  info: T
  helper: T
  validation: T
  counter: T
}

export type FieldSetupType = ComponentBaseType & {
  classes: ComputedRef<FieldClassesType>
  isCounter: ComputedRef<boolean>
  isMax: ComputedRef<boolean>
  isMessage: ComputedRef<boolean>
}
