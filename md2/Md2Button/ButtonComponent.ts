import { ButtonComponentAbstract } from '../../constructors/Button/ButtonComponentAbstract'
import { props } from './props'
import { AssociativeType } from '../../constructors/types'

export class ButtonComponent extends ButtonComponentAbstract {
  protected readonly instruction = props as AssociativeType
  protected readonly appearanceInverse = ['contained'] as string[]
  protected code = 'md2.button' as string
}
