import { computed, ComputedRef, Ref, ref } from 'vue'
import { GeoIntl } from '../../classes/GeoIntl'
import { MaskRubberItem } from './MaskRubberItem'
import { MaskRubberTransition } from './MaskRubberTransition'
import { forEach, getExp, isSelected, strFill } from '../../functions'
import { AssociativeType } from '../types'
import { MaskItemsType, MaskItemType, MaskSpecialItemType, MaskSpecialType } from './types'
import { MaskSpecial } from './MaskSpecial'
import { MaskNumber } from './MaskNumber'
import { MaskType } from './MaskType'

export class MaskRubber {
  protected values?: ComputedRef<MaskItemsType>
  protected readonly length = ref<AssociativeType<number>>({})

  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly type: MaskType,
    protected readonly item: MaskRubberItem,
    protected readonly number: MaskNumber,
    protected readonly special: MaskSpecial,
    protected readonly transition: MaskRubberTransition,
    protected readonly fraction: Ref<boolean | number>,
    protected readonly currency: Ref<string>,
    protected readonly match: Ref<RegExp>
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

  protected getItem (special: string) {
    return this.rubber.value?.[special]
  }

  protected getValue (special: string): MaskItemType | undefined {
    return this.values?.value?.[special]
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
        this.ifMatch(char) &&
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
