import { computed, Ref } from 'vue'
import { MaskDate } from './MaskDate'
import { MaskRubber } from './MaskRubber'
import { maxListLength } from '../../functions'
import { ArrayOrStringType, GeoDateType } from '../types'
import { MaskPatternType, MaskPatternTypeType, MaskSpecialType, MaskTypeType } from './types'

export class MaskItem {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly character: Ref<string[]>,
    protected readonly mask: Ref<ArrayOrStringType>,
    protected readonly type: Ref<GeoDateType & MaskTypeType>,
    protected readonly rubbers: MaskRubber,
    protected readonly special: Ref<MaskSpecialType>,
    protected readonly pattern: Ref<MaskPatternType>
  ) {
  }

  protected readonly date = computed(() => new MaskDate(this.type))

  // DELETE
  protected readonly ifDate = computed<boolean>(() => ['text', 'number', 'currency'].indexOf(this.type.value) === -1)
  protected readonly ifNumber = computed<boolean>(() => ['number', 'currency'].indexOf(this.type.value) !== -1)

  readonly length = computed<number>(() => {
    console.log('this.mask.value', this.mask.value)
    if (Array.isArray(this.mask.value)) {
      return maxListLength(this.mask.value)
    } else {
      return this.activeMask.value.length
    }
  })

  // DELETE
  readonly specialChars = computed<string[]>(() => {
    if (this.ifNumber.value) {
      return ['n', 'f']
    } else if (this.ifDate.value) {
      return ['Y', 'M', 'D', 'h', 'm', 's']
    } else if (typeof this.special.value === 'object') {
      return Object.keys(this.special.value)
    } else if (Array.isArray(this.special.value)) {
      return this.special.value
    } else {
      return [this.special.value]
    }
  })

  activeMask = computed<string[]>(() => {
    if (this.ifNumber.value) {
      return this.rubbers.getMaskByNumber()
    } else if (this.ifDate.value) {
      return this.date.value.getMaskByDate()
    } else {
      return this.basic.value
    }
  })

  protected basic = computed<string[]>(() => {
    const mask = this.mask.value

    if (Array.isArray(mask)) {
      return this.rubbers.get(
        mask.find(item => this.getSpecialLength(item) >= this.character.value.length) || mask?.[0] || ''
      ).split('')
    } else {
      console.log('this.rubbers.get(mask).split(\'\')', this.rubbers.get(mask).split(''))
      return this.rubbers.get(mask).split('')
    }
  })

  readonly patternChars = computed<MaskPatternType>(() => {
    if (this.ifDate.value) {
      return {
        ...this.date.value.pattern,
        ...this.pattern.value
      }
    } else if (
      typeof this.special.value === 'string' &&
      ['function', 'string'].indexOf(typeof this.pattern.value) !== -1
    ) {
      return { [this.special.value]: this.pattern.value as MaskPatternTypeType }
    } else {
      return this.pattern.value || {}
    }
  })

  protected getSpecialLength (mask: string): number {
    return mask
      .split('')
      .filter(char => this.ifSpecial(char))
      .length
  }

  // DELETE
  ifSpecial (char: string): boolean {
    return this.specialChars.value.indexOf(char) !== -1
  }
}
