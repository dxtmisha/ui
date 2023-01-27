import { ComponentPropsAbstract } from '../../classes/ComponentPropsAbstract'
import { props } from './props'
import { AssociativeType } from '../types'

export class FieldProps extends ComponentPropsAbstract {
  protected readonly name = 'field'
  protected readonly list = props as AssociativeType
  protected readonly exception = [
    'counter',
    'disabledPrevious',
    'disabledNext',
    'validationMessage',
    'value'
  ] as string[]
}
