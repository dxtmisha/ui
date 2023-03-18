import { IconComponentAbstract } from '../../constructors/Icon/IconComponentAbstract'
import { props } from './props'

import { AssociativeType } from '../../constructors/types'

export class IconComponent extends IconComponentAbstract {
  static readonly code = 'md2.icon' as string
  static readonly instruction = props as AssociativeType
}
