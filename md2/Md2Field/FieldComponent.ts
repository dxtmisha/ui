import { FieldComponentAbstract } from '../../constructors/Field/FieldComponentAbstract'
import { props } from './props'
import { AssociativeType } from '../../constructors/types'

export class FieldComponent extends FieldComponentAbstract {
  static readonly code = 'md2.field' as string
  static readonly instruction = props as AssociativeType
}
