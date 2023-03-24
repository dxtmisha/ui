import {
  ComponentBaseType
} from '../types'
import { MotionCellToSetupType } from './MotionCellTo'

export type MotionCellSetupType = ComponentBaseType &
  MotionCellToSetupType &
  {
    onTransition: (event: TransitionEvent) => void
  }
