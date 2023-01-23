import { InputComponentAbstract } from '../../constructors/Input/InputComponentAbstract'
import { props } from './props'
import { AssociativeType } from '../../constructors/types'

export class InputComponent extends InputComponentAbstract {
  static readonly code = 'md2.input' as string
  static readonly instruction = props as AssociativeType
}
