import { CheckboxComponentAbstract } from '../../constructors/Checkbox/CheckboxComponentAbstract'
import { props } from './props'
import { AssociativeType } from '../../constructors/types'

export class CheckboxComponent extends CheckboxComponentAbstract {
  static readonly code = 'md2.checkbox' as string
  static readonly instruction = props as AssociativeType
}
