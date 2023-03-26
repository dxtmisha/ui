import { ComponentPropsAbstract } from '../../classes/ComponentPropsAbstract'
import { props } from './props'
import { AssociativeType } from '../types'

export class ScrollProps extends ComponentPropsAbstract {
  protected readonly name = 'scroll'
  protected readonly list = props as AssociativeType
  protected readonly exception = [] as string[]
}
