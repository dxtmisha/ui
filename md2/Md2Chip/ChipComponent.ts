import { ChipComponentAbstract } from '../../constructors/Chip/ChipComponentAbstract'
import { props } from './props'
import { AssociativeType } from '../../constructors/types'

export class ChipComponent extends ChipComponentAbstract {
  static readonly code = 'md2.chip' as string
  static readonly instruction = props as AssociativeType

  protected readonly appearanceInverse = [] as string[]
}
