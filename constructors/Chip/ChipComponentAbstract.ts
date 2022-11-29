import { ButtonComponentAbstract } from '../Button/ButtonComponentAbstract'
import { _props } from './_props'
import { AssociativeType } from '../types'

export abstract class ChipComponentAbstract extends ButtonComponentAbstract {
  protected readonly instruction = _props as AssociativeType
  protected readonly appearanceInverse = [] as string[]
}
