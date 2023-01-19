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
    protected readonly value: Ref<MaskItemsType>
  ) {
    watchEffect(() => {
      const standard = this.getStandard()
      this.value.value = {} as MaskItemsType

      this.mask.get().forEach((char, index) => {
        if (this.special.isSpecial(char)) {
          const value = this.add(this.value.value, char)

          if (this.isStandard(index)) {
            value.chars.push(standard[index])
          }

          value.maxLength++
          value.full = value.maxLength === value.chars.length
          value.value = value.full ? value.chars.join('') : ''
        }
      })
    })
  }

  protected readonly full = computed<boolean>(() => {
    let empty = false

    forEach(this.value.value, item => {
      if (!item.full) {
        empty = true
      }
    })

    return !empty
  })

  protected readonly item = computed<string>(() => {
    if (this.isFull()) {
      if (this.type.isCurrencyOrNumber()) {
        return this.format.getValue()
      } else if (this.type.isDate()) {
        return this.date.getValue()
      } else {
        return this.standard.value
      }
    } else {
      return ''
    }
  })

  protected readonly itemForCheck = computed<MaskItemType>(() => {
    return {
      index: 'check',
      value: this.item.value,
      maxLength: this.item.value.length,
      full: this.isFull(),
      chars: this.item.value.split('')
    }
  })

  protected readonly standard = computed<string>(() => {
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
