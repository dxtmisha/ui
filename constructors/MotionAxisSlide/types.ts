import { ComputedRef, Ref } from 'vue'

import { ComponentBaseType } from '../types'
import { MotionAxisSlideStatusType } from './MotionAxisSlideStatus'

export type MotionAxisSlideSetupType = ComponentBaseType & {
  isShow: ComputedRef<boolean>
  status: Ref<MotionAxisSlideStatusType>

  onTransitionend: (event: TransitionEvent) => void
}
