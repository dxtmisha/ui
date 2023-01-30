import { computed, Ref } from 'vue'
import { MaskItem } from './MaskItem'
import { MaskRubber } from './MaskRubber'
import { MaskSpecial } from './MaskSpecial'
import { MaskType } from './MaskType'
import { MaskValidation } from './MaskValidation'
import { MaskValue } from './MaskValue'

import { AssociativeOrStringType } from '../types'
import { MaskViewType } from './types'

export class MaskView {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly type: MaskType,
    protected readonly special: MaskSpecial,
    protected readonly rubbers: MaskRubber,
    protected readonly mask: MaskItem,
    protected readonly value: MaskValue,
    protected readonly validation: MaskValidation,
    protected readonly viewChar: Ref<AssociativeOrStringType>,
    protected readonly className: string
  ) {
  }

  readonly item = computed<MaskViewType[]>(() => {
    const data = [] as MaskViewType[]

    this.mask.get().forEach((item, index) => {
      data.push({
        type: `${this.className} ${this.getType(item, index)}`,
        value: this.getValue(item, index)
      })
    })

    return data
  })

  protected readonly view = computed<AssociativeOrStringType>(() => {
    if (this.type.isDate() && typeof this.viewChar.value !== 'object') {
      return {
        Y: 'y',
        M: 'm',
        D: 'd',
        h: 'h',
        m: 'm',
        s: 's'
      }
    } else {
      return this.viewChar.value
    }
  })

  get (): MaskViewType[] {
    return this.item.value
  }

  protected getValue (item: string, index: number): string {
    return this.value.getStandardItem(index) || this.getSpecial(item)
  }

  protected getSpecial (item: string): string {
    if (this.special.isSpecial(item)) {
      const view = this.view.value

      switch (typeof view) {
        case 'string':
          return view
        case 'object':
          if (item in view) {
            return view[item]
          }
      }
    }

    return item
  }

  protected getType (item: string, index: number): string {
    if (this.value.getStandardLength() > index) {
      if (!this.special.isSpecial(item)) {
        return 'is-standard'
      } else if (this.validation.is(item)) {
        return 'is-error'
      } else {
        return 'is-special'
      }
    } else {
      return `is-placeholder${this.rubbers.isTransition(item) ? ' is-transition' : ''}`
    }
  }
}
