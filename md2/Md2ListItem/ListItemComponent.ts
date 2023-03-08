import { ListItemComponentAbstract } from '../../constructors/ListItem/ListItemComponentAbstract'
import { AssociativeType } from '../../constructors/types'

export class ListItemComponent extends ListItemComponentAbstract {
  static readonly code = 'md2.list-item' as string

  protected readonly classesExtra = ['overlay'] as string[]

  constructor (
    props: AssociativeType & object,
    context: AssociativeType & object
  ) {
    super(props, context, ['contained'])
  }
}
