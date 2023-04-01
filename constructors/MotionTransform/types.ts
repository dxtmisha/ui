import {
  ComponentAssociativeType,
  ComponentBaseType,
  ComponentClassesType
} from '../types'
import { ComputedRef } from 'vue'

export type MotionTransformClassesType<T = ComponentAssociativeType> = ComponentClassesType<T> & {
  body: T
}

export type MotionTransformSetupType = ComponentBaseType & {
  classes: ComputedRef<MotionTransformClassesType>
}
