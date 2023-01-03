import { FieldMessageComponentAbstract } from '../../constructors/FieldMessage/FieldMessageComponentAbstract'
import { props } from '../../constructors/FieldMessage/props'
import { AssociativeType } from '../../constructors/types'

export class FieldMessageComponent extends FieldMessageComponentAbstract {
  static readonly code = 'md2.field-message' as string
  static readonly instruction = props as AssociativeType
}
