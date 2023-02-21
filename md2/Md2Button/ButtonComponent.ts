import { ButtonComponentAbstract } from '../../constructors/Button/ButtonComponentAbstract'
import { props } from './props'
import { AssociativeType } from '../../constructors/types'

export class ButtonComponent extends ButtonComponentAbstract {
  static readonly code = 'md2.button' as string
  static readonly instruction = props as AssociativeType

  constructor (
    props: AssociativeType & object,
    context: AssociativeType & object
  ) {
    super(props, context, ['contained'])
  }
}
