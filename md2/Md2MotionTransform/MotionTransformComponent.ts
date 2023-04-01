import { MotionTransformComponentAbstract } from '../../constructors/MotionTransform/MotionTransformComponentAbstract'
import { props } from './props'

import { AssociativeType } from '../../constructors/types'

export class MotionTransformComponent extends MotionTransformComponentAbstract {
  static readonly code = 'md2.motion-transform' as string
  static readonly instruction = props as AssociativeType
}
