import { CheckboxComponentAbstract } from '../Checkbox/CheckboxComponentAbstract'
import { AssociativeType } from '../types'

export abstract class RadioComponentAbstract extends CheckboxComponentAbstract {
  protected readonly type = 'radio' as string

  constructor (
    props: AssociativeType & object,
    context: AssociativeType & object
  ) {
    super(props, context, false)
  }
}
