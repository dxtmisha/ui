import { MaskFormat } from './MaskFormat'
import { AssociativeType } from '../types'
import { MaskSpecialItemType } from './types'

export class MaskNumber {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly format: MaskFormat
  ) {
  }

  getRubber (): AssociativeType<MaskSpecialItemType> {
    return {
      n: {
        rubber: true,
        transitionChar: this.format.getDecimal(),
        maxLength: 12
      },
      f: {
        rubber: this.format.isFractionRubber(),
        maxLength: 6
      }
    }
  }
}
