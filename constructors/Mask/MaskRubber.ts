import { computed, Ref } from 'vue'
import { MaskNumber } from './MaskNumber'
import { MaskMatch } from './MaskMatch'
import { MaskRubberItem } from './MaskRubberItem'
import { MaskRubberTransition } from './MaskRubberTransition'
import { MaskSpecial } from './MaskSpecial'
import { MaskType } from './MaskType'
import { isSelected } from '../../functions'
import { AssociativeType } from '../types'
import { MaskItemsType, MaskItemType, MaskSpecialItemType } from './types'

export class MaskRubber {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly type: MaskType,
    protected readonly item: MaskRubberItem,
    protected readonly transition: MaskRubberTransition,
    protected readonly match: MaskMatch,
    protected readonly special: MaskSpecial,
    protected readonly number: MaskNumber,
    protected readonly value?: Ref<MaskItemsType>
  ) {
  }

  protected readonly rubber = computed<AssociativeType<MaskSpecialItemType>>(
    () => this.type.isCurrencyOrNumber() ? this.number.getRubber() : this.special.getRubber()
  )

  protected readonly transitionChars = computed<string[]>(() => {
    return Object.values<MaskSpecialItemType>(this.rubber.value)
      .filter(item => typeof item?.transitionChar === 'string' || Array.isArray(item?.transitionChar))
      .flat() as string[]
  })

  get (): AssociativeType<MaskSpecialItemType> {
    return this.rubber.value
  }

  getItem (index: string): MaskSpecialItemType | undefined {
    return this.get()?.[index]
  }

  protected getValue (special: string): MaskItemType | undefined {
    return this.value?.value?.[special]
  }

  is (index: string): boolean {
    return index in this.get()
  }

  set (index: string, char: string): boolean {
    const item = this.getItem(index)
    const value = this.getValue(index)

    if (item && value) {
      if (
        isSelected(char, item?.transitionChar) || (
          item?.maxLength &&
          item?.maxLength <= value?.maxLength
        )
      ) {
        this.transition.set(index)
      } else if (
        value.full &&
        this.match.isMatch(char) &&
        this.transition.disabled(index)
      ) {
        this.item.add(index)
        this.transition.reset()
        return true
      }
    }

    return false
  }
}
