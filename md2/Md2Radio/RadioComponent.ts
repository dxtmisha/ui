import { RadioComponentAbstract } from '../../constructors/Radio/RadioComponentAbstract'
import { props } from './props'
import { AssociativeType } from '../../constructors/types'

export class RadioComponent extends RadioComponentAbstract {
  static readonly code = 'md2.radio' as string
  static readonly instruction = props as AssociativeType
}
