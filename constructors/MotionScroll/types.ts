import { AssociativeType, ComponentBaseType } from '../types'
import { ComputedRef } from 'vue'

export type MotionScrollSetupType = ComponentBaseType & {
  scrollBind: ComputedRef<AssociativeType>

  onBeforeUpdate: () => void
  onUpdated: () => void
}
