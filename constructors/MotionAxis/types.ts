import { ComputedRef } from 'vue'
import { MotionAxisSlides } from './MotionAxisSlides'

import {
  ComponentAssociativeType,
  ComponentBaseType,
  ComponentClassesType, NumberOrStringType
} from '../types'

export type MotionAxisClassesType<T = ComponentAssociativeType> = ComponentClassesType<T> & {
  slide: T
}

export type MotionAxisSetupType = ComponentBaseType & {
  classes: ComputedRef<MotionAxisClassesType>

  slides: MotionAxisSlides

  onTransitionend: (name: NumberOrStringType, event: TransitionEvent) => void
}
