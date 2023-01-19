import { computed, Ref } from 'vue'
import { MaskType } from './MaskType'
import { MaskSpecialItemType, MaskSpecialType } from './types'
import { forEach, isSelected } from '../../functions'
import { AssociativeType } from '../types'

export class MaskSpecial {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly type: MaskType,
    protected readonly special: Ref<MaskSpecialType>
  ) {
  }

  protected readonly item = computed<string[]>(() => {
    if (this.type.isCurrencyOrNumber()) {
      return ['n', 'f']
    } else if (this.type.isDate()) {
      return ['Y', 'M', 'D', 'h', 'm', 's']
    } else if (typeof this.special.value === 'object') {
      return Object.keys(this.special.value)
    } else if (Array.isArray(this.special.value)) {
      return this.special.value
    } else {
      return [this.special.value]
    }
  })

  get () {
    return this.item.value
  }

  getOnly (): string {
    return this.get()?.[0]
  }

  getRubber (): AssociativeType<MaskSpecialItemType> {
    const data = {} as AssociativeType<MaskSpecialItemType>

    forEach<MaskSpecialItemType, string, void>(this.get(), (item, index) => {
      if (item?.rubber) {
        data[index] = item
      }
    })

    return data
  }

  isArray () {
    return Array.isArray(this.special.value)
  }

  isObject () {
    return typeof this.special.value === 'object'
  }

  isSpecial (char: string): boolean {
    return this.item.value.indexOf(char) !== -1
  }

  isString () {
    return typeof this.special.value === 'string'
  }
}
