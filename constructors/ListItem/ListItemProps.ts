import { ComponentPropsAbstract } from '../../classes/ComponentPropsAbstract'
import { props } from './props'
import { AssociativeType } from '../types'

export class ListItemProps extends ComponentPropsAbstract {
  protected readonly name = 'item'
  protected readonly list = props as AssociativeType
  protected readonly exception = [] as string[]
}
