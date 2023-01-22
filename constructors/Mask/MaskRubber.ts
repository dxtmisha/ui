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
    protected value: Ref<MaskItemsType>
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

  isByValue (index: string): boolean {
    return this.is(index) && index in this.value?.value
  }

  isTransition (index: string): boolean {
    return this.transitionChars.value.indexOf(index) !== -1
  }

  pop (index: string): boolean {
    return this.rubber.pop(index)
  }

  set (index: string, char: string): boolean {
    console.log('this.get()', this.get())
    if (this.isByValue(index)) {
      const item = this.getItem(index)
      const value = this.value?.value?.[index]

      if (
        isSelected(char, item?.transitionChar) || (
          item?.maxLength &&
          item?.maxLength <= value?.maxLength
        )
      ) {
        this.transition.set(index)
        return false
      } else if (
        value.full &&
        this.match.isMatch(char) &&
        this.transition.disabled(index)
      ) {
        this.rubber.add(index)
        this.transition.reset()
      }

      return true
    }

    return false
  }

  setValue (value: Ref<MaskItemsType>): this {
    this.value = value
    return this
  }
}
