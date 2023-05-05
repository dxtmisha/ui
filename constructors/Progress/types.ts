import { ComputedRef } from 'vue'
import {
  EventCallbackRequiredType
} from '../types'
import { ComponentAssociativeType, ComponentBaseType, ComponentClassesType } from '../typesRef'

export type ProgressClassesType = ComponentClassesType & {
  circle: ComponentAssociativeType
}

export type ProgressSetupType = ComponentBaseType & {
  classes: ComputedRef<ProgressClassesType>
  tag: ComputedRef<string>
  isCircular: ComputedRef<boolean>
  valueInPercent: ComputedRef<string | null>
  onAnimation: EventCallbackRequiredType<void, AnimationEvent>
}
