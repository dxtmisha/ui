import { ComputedRef } from 'vue'
import {
  AssociativeType,
  ComponentBaseType
} from '../types'

export type MotionAxisSetupType = ComponentBaseType & {
  slideBind: ComputedRef<AssociativeType>

  onStatus: (event: AssociativeType) => void
}
