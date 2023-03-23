import { Ref } from 'vue'

import { MotionAxisToGoSetupType } from './MotionAxisToGo'

import { AssociativeType, ComponentBaseType } from '../types'
import { MotionAxisAxisType, MotionAxisTransitionType } from '../MotionAxis/props.type'

export type MotionAxisSetupType = ComponentBaseType &
  MotionAxisToGoSetupType &
  {
    selectedBind: Ref<string>

    axis: Ref<MotionAxisAxisType | undefined>
    transition: Ref<MotionAxisTransitionType | undefined>

    onStatus: (event: AssociativeType) => void
  }
