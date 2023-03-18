import {
  ComponentAssociativeType,
  ComponentBaseType,
  ComponentClassesType, NumberOrStringType
} from '../types'
import { MotionAxisSlides } from './MotionAxisSlides'

export type MotionAxisClassesType<T = ComponentAssociativeType> = ComponentClassesType<T> & {
  slide: T
}

export type MotionAxisSetupType = ComponentBaseType & {
  slides: MotionAxisSlides

  onTransitionend: (name: NumberOrStringType, event: TransitionEvent) => void
}
