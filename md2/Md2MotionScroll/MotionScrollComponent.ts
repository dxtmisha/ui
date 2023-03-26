import { MotionScrollComponentAbstract } from '../../constructors/MotionScroll/MotionScrollComponentAbstract'
import { props } from './props'
import { AssociativeType } from '../../constructors/types'

export class MotionScrollComponent extends MotionScrollComponentAbstract {
  static readonly code = 'md2.motion-scroll' as string
  static readonly instruction = props as AssociativeType
}
