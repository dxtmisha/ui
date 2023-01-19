import { computed, Ref } from 'vue'
import { MaskType } from './MaskType'
import { forEach } from '../../functions'
import { MaskSpecialItemType, MaskSpecialType } from './types'
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

  get (): string[] {
    return this.item.value
  }

  getOnly (): string {
    return this.get()?.[0] || '*'
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

  isSpecial (char: string): boolean {
    return this.item.value.indexOf(char) !== -1
  }

  isString (): boolean {
    return typeof this.special.value === 'string'
  }
}
