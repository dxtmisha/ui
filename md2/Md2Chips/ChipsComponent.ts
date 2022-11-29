import { ChipsComponentAbstract } from '../../constructors/Chips/ChipsComponentAbstract'
import { props } from './props'
import { AssociativeType } from '../../constructors/types'

export class ChipsComponent extends ChipsComponentAbstract {
  protected readonly instruction = props as AssociativeType
  protected code = 'md2.chips' as string
}
