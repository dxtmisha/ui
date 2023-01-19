import { MaskItemsType, MaskItemType } from './types'
import { computed, Ref, watchEffect } from 'vue'
import { MaskItem } from './MaskItem'
import { MaskRubberTransition } from './MaskRubberTransition'
import { MaskSpecial } from './MaskSpecial'

export class MaskValue {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly transition: MaskRubberTransition,
    protected readonly special: MaskSpecial,
    protected readonly mask: MaskItem,
    protected readonly character: Ref<string[]>,
    protected readonly values: Ref<MaskItemsType>
  ) {
    watchEffect(() => {
      const standard = this.getStandard()
      this.values.value = {} as MaskItemsType

      this.mask.get().forEach((char, index) => {
        if (this.special.isSpecial(char)) {
          const value = this.add(this.values.value, char)

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

  getItem (index: number): string {
    return this.getStandard()?.[index]
  }

  getStandard (): string {
    return this.standard.value
  }

  isStandard (index: number): boolean {
    return !!this.getItem(index)
  }
}
