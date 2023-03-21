import {
  AssociativeType,
  ComponentBaseType
} from '../types'

export type MotionAxisSetupType = ComponentBaseType & {
  onStatus: (event: AssociativeType) => void
}
