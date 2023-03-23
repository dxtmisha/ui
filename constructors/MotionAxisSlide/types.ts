import { ComputedRef, Ref } from 'vue'

import { AssociativeType, ComponentBaseType } from '../types'
import { MotionAxisSlideStatusType } from './MotionAxisSlideStatus'

export type MotionAxisSlideSetupType = ComponentBaseType & {
  isShow: ComputedRef<boolean>
  status: Ref<MotionAxisSlideStatusType>

  binds: ComputedRef<AssociativeType>

  onTransitionend: (event: TransitionEvent) => void
}
