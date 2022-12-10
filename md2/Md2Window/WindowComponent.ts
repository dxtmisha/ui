import { WindowComponentAbstract } from '../../constructors/Window/WindowComponentAbstract'
import { props } from './props'
import { AssociativeType } from '../../constructors/types'

export class WindowComponent extends WindowComponentAbstract {
  static readonly code = 'md2.window' as string
  static readonly instruction = props as AssociativeType
}
