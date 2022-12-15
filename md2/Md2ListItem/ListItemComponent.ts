import { ListItemComponentAbstract } from '../../constructors/ListItem/ListItemComponentAbstract'

export class ListItemComponent extends ListItemComponentAbstract {
  static readonly code = 'md2.list-item' as string

  protected readonly classesExtra = ['overlay'] as string[]
  protected readonly appearanceInverse = ['contained'] as string[]
}
