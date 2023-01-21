import { computed, Ref } from 'vue'
import { MaskDate } from './MaskDate'
import { MaskFormat } from './MaskFormat'
import { MaskRubberItem } from './MaskRubberItem'
import { MaskSpecial } from './MaskSpecial'
import { MaskType } from './MaskType'
import { maxListLength } from '../../functions'
import { ArrayOrStringType } from '../types'
import { MaskItemSpecialType } from './types'

export class MaskItem {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly type: MaskType,
    protected readonly rubber: MaskRubberItem,
    protected readonly date: MaskDate,
    protected readonly format: MaskFormat,
    protected readonly special: MaskSpecial,
    protected readonly mask: Ref<ArrayOrStringType>,
    protected readonly character: Ref<string[]>
  ) {
  }

  readonly activeMask = computed<string[]>(() => {
    if (this.type.isCurrencyOrNumber()) {
      return this.format.getMaskByNumber()
    } else if (this.type.isDate()) {
      return this.date.getMaskByDate()
    } else {
      return this.basic.value
    }
  })

  readonly basic = computed<string[]>(() => {
    const mask = this.mask.value

    if (Array.isArray(mask)) {
      return this.rubber.expandMask(
        mask.find(item => this.getSpecialLength(item) >= this.character.value.length) || mask?.[0] || ''
      ).split('')
    } else {
      return this.rubber.expandMask(mask).split('')
    }
  })

  readonly length = computed<number>(() => {
    if (Array.isArray(this.mask.value)) {
      return maxListLength(this.mask.value)
    } else {
      return this.activeMask.value.length
    }
  })

  readonly specialOnly = computed<MaskItemSpecialType[]>(() => {
    const data = [] as MaskItemSpecialType[]
    let index = 0

    this.activeMask.value.forEach((char, key) => {
      if (this.special.isSpecial(char)) {
        data.push({
          index: index++,
          key,
          char
        })
      }
    })

    return data
  })

  get (): string[] {
    return this.activeMask.value
  }

  getItem (index: number): string {
    return this.get()?.[index] || ''
  }

  getLength (): number {
    return this.activeMask.value.length
  }

  getLengthBySpecial (): number {
    return this.specialOnly.value.length
  }

  getMaxLength (): number {
    return this.length.value
  }

  getSpecial (): MaskItemSpecialType[] {
    return this.specialOnly.value
  }

  protected getSpecialLength (mask: string): number {
    return mask
      .split('')
      .filter(char => this.special.isSpecial(char))
      .length
  }
}
