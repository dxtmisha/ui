import { ComputedRef, Ref } from 'vue'
import { MotionAxisSlides } from './MotionAxisSlides'
import { MotionAxisStatusType } from './MotionAxisStatus'

import {
  AssociativeType,
  ComponentAssociativeType,
  ComponentBaseType,
  ComponentClassesType, NumberOrStringType
} from '../types'

export type MotionAxisClassesType<T = ComponentAssociativeType> = ComponentClassesType<T> & {
  slide: T
}

export type MotionAxisSetupType = ComponentBaseType & {
  classes: ComputedRef<MotionAxisClassesType>

  preparation: Ref<string>

  list: ComputedRef<AssociativeType<MotionAxisStatusType>>
  slides: MotionAxisSlides

  onEnd: (name: NumberOrStringType, event: TransitionEvent) => void
}
