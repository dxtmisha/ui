import { MaskItemsType, MaskItemType } from './types'
import { computed, Ref, watchEffect } from 'vue'
import { MaskDate } from './MaskDate'
import { MaskFormat } from './MaskFormat'
import { MaskItem } from './MaskItem'
import { MaskRubberTransition } from './MaskRubberTransition'
import { MaskSpecial } from './MaskSpecial'
import { MaskType } from './MaskType'
import { forEach } from '../../functions'

export class MaskValue {
  constructor (
    protected readonly type: MaskType,
    protected readonly transition: MaskRubberTransition,
    protected readonly date: MaskDate,
    protected readonly format: MaskFormat,
    protected readonly special: MaskSpecial,
    protected readonly mask: MaskItem,
    protected readonly character: Ref<string[]>,
    protected readonly valueIn: Ref<MaskItemsType>
  ) {
    watchEffect(() => {
      this.valueIn.value = this.value.value
    })
  }

  readonly value = computed<MaskItemsType>(() => {
    const standard = this.getStandard()
    const data = {} as MaskItemsType

    this.mask.get().forEach((char, index) => {
      if (this.special.isSpecial(char)) {
        const value = this.add(data, char)

        if (this.isStandard(index)) {
          value.chars.push(standard[index])
        }

        value.maxLength++
        value.full = value.maxLength === value.chars.length
        value.value = value.full ? value.chars.join('') : ''
      }
    })

    return data
  })

  readonly full = computed<boolean>(() => {
    let empty = false

    forEach(this.value.value, item => {
      if (!item.full) {
        empty = true
      }
    })

    return !empty
  })

  readonly item = computed<string>(() => {
    if (this.type.isCurrencyOrNumber()) {
      return this.format.getValue()
    } else if (this.type.isDate()) {
      return this.date.getValue()
    } else {
      return this.standard.value
    }
  })

  readonly itemForCheck = computed<MaskItemType>(() => {
    return {
      index: 'check',
      value: this.item.value,
      maxLength: this.item.value.length,
      full: this.isFull(),
      chars: this.item.value.split('')
    }
  })

  readonly standard = computed<string>(() => {
    const character = this.character.value
    const value = [] as string[]

    let stop: boolean
    let key = 0 as number

    this.mask.get().forEach(char => {
      if (!stop) {
        if (!this.special.isSpecial(char)) {
          value.push(char)
        } else if (key in character) {
          value.push(character[key++])

          if (
            key >= character.length &&
            this.transition.is() &&
            this.transition.disabled(char)
          ) {
            stop = true
          }
        } else {
          stop = true
        }
      }
    })

    return value.join('')
  })

  protected add (data: MaskItemsType, index: string): MaskItemType {
    if (!(index in data)) {
      data[index] = {
        index,
        maxLength: 0,
        full: false,
        chars: [],
        value: ''
      }
    }

    return data[index]
  }

  get (): MaskItemsType {
    return this.value.value
  }

  getForCheck (): MaskItemType {
    return this.itemForCheck.value
  }

  getInfo (index: string): MaskItemType | undefined {
    return this.get()?.[index]
  }

  getItem (index: number): string {
    return this.getStandard()?.[index]
  }

  getStandard (): string {
    return this.standard.value
  }

  getStandardItem (index: number): string | undefined {
    return this.getStandard()?.[index]
  }

  getStandardLength (): number {
    return this.getStandard().length
  }

  getValue (): string {
    return this.item.value
  }

  is (index: string): boolean {
    return index in this.value.value
  }

  isFull (): boolean {
    return this.full.value
  }

  isStandard (index: number): boolean {
    return !!this.getItem(index)
  }
}
