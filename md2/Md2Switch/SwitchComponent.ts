import { SwitchComponentAbstract } from '../../constructors/Switch/SwitchComponentAbstract'
import { props } from './props'
import { AssociativeType } from '../../constructors/types'

export class SwitchComponent extends SwitchComponentAbstract {
  static readonly code = 'md2.switch' as string
  static readonly instruction = props as AssociativeType
}
