import { ScrollbarComponentAbstract } from '../../constructors/Scrollbar/ScrollbarComponentAbstract'
import { props } from './props'
import { AssociativeType } from '../../constructors/types'

export class ScrollbarComponent extends ScrollbarComponentAbstract {
  static readonly code = 'md2.scrollbar' as string
  static readonly instruction = props as AssociativeType
}
