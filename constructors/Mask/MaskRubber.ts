import { computed, Ref } from 'vue'
import { MaskFormat } from './MaskFormat'
import { MaskMatch } from './MaskMatch'
import { MaskRubberItem } from './MaskRubberItem'
import { MaskRubberTransition } from './MaskRubberTransition'
import { MaskSpecial } from './MaskSpecial'
import { MaskType } from './MaskType'
import { isSelected } from '../../functions'
import { AssociativeType } from '../types'
import { MaskItemsType, MaskSpecialItemType } from './types'

export class MaskRubber {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly type: MaskType,
    protected readonly rubber: MaskRubberItem,
    protected readonly transition: MaskRubberTransition,
    protected readonly format: MaskFormat,
    protected readonly match: MaskMatch,
    protected readonly special: MaskSpecial,
    protected readonly value: Ref<MaskItemsType>
  ) {
  }

  protected readonly item = computed<AssociativeType<MaskSpecialItemType>>(
    () => this.type.isCurrencyOrNumber() ? this.format.getRubber() : this.special.getRubber()
  )

  protected readonly transitionChars = computed<string[]>(() => {
    return Object.values<MaskSpecialItemType>(this.item.value)
      .filter(item => typeof item?.transitionChar === 'string' || Array.isArray(item?.transitionChar))
      .flat() as string[]
  })

  get (): AssociativeType<MaskSpecialItemType> {
    return this.item.value
  }

  getItem (index: string): MaskSpecialItemType | undefined {
    return this.get()?.[index]
  }

  is (index: string): boolean {
    return index in this.get()
  }

  isTransition (index: string): boolean {
    return this.transitionChars.value.indexOf(index) !== -1
  }

  set (index: string, char: string): boolean {
    const item = this.getItem(index)
    const value = this.value?.value?.[index]

    console.log('item', index, item, value)

    if (item && value) {
      if (
        isSelected(char, item?.transitionChar) || (
          item?.maxLength &&
          item?.maxLength <= value?.maxLength
        )
      ) {
        console.log('transition', index)
        this.transition.set(index)
      } else if (
        value.full &&
        this.match.isMatch(char) &&
        this.transition.disabled(index)
      ) {
        console.log('add', index)
        this.rubber.add(index)
        this.transition.reset()
        return true
      }
    }

    return false
  }
}
