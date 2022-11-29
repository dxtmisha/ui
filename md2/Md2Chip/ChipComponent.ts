import { ChipComponentAbstract } from '../../constructors/Chip/ChipComponentAbstract'
import { props } from './props'
import { AssociativeType } from '../../constructors/types'

export class ChipComponent extends ChipComponentAbstract {
  protected readonly instruction = props as AssociativeType
  protected code = 'md2.chip' as string
}
