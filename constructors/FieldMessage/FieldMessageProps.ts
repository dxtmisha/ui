import { ComponentPropsAbstract } from '../../classes/ComponentPropsAbstract'
import { props } from './props'
import { AssociativeType } from '../types'

export class FieldMessageProps extends ComponentPropsAbstract {
  protected readonly name = 'message'
  protected readonly list = props as AssociativeType
  protected readonly exception = [
    'counter',
    'disabled',
    'helperMessage',
    'maxlength',
    'validationMessage'
  ] as string[]
}
