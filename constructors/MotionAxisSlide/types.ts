import { ComputedRef } from 'vue'

import { ComponentBaseType } from '../types'
import { MotionAxisSlideStatusType } from './MotionAxisSlideStatus'

export type MotionAxisSlideSetupType = ComponentBaseType & {
  isShow: ComputedRef<boolean>
  status: ComputedRef<MotionAxisSlideStatusType>

  onTransitionend: (event: TransitionEvent) => void
}
