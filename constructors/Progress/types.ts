import { ComputedRef } from 'vue'
import {
  ComponentAssociativeType,
  ComponentBaseType,
  ComponentClassesType,
  EventCallbackRequiredType
} from '../types'

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
