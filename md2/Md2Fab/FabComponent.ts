import { FabComponentAbstract } from '../../constructors/Fab/FabComponentAbstract'
import { props } from './props'
import { AssociativeType } from '../../constructors/types'

export class FabComponent extends FabComponentAbstract {
  static readonly code = 'md2.fab' as string
  static readonly instruction = props as AssociativeType

  protected readonly appearanceInverse = ['all'] as string[]
}
