import { computed, ComputedRef, Ref, ref } from 'vue'
import { GeoIntl } from '../../classes/GeoIntl'
import { MaskRubberTransition } from './MaskRubberTransition'
import { forEach, getExp, isSelected, strFill } from '../../functions'
import { AssociativeType } from '../types'
import { MaskItemsType, MaskItemType, MaskSpecialItemType, MaskSpecialType } from './types'

export class MaskRubber {
  protected values?: ComputedRef<MaskItemsType>
  protected readonly length = ref<AssociativeType<number>>({})
  readonly transition: MaskRubberTransition

  constructor (
    protected readonly type: Ref<string>,
    protected readonly fraction: Ref<boolean | number>,
    protected readonly currency: Ref<string>,
    protected readonly match: Ref<RegExp>,
    protected readonly special: Ref<MaskSpecialType>
  ) {
    this.transition = new MaskRubberTransition()
  }

  protected readonly intl = computed<GeoIntl>(() => new GeoIntl())

  protected readonly decimal = computed<string | string[] | undefined>(() => {
    return this.ifNumber.value ? [this.intl.value.numberDecimal().value, '.'] : undefined
  })

  protected readonly format = computed<string>(() => {
    const currency = this.type.value === 'currency' ? ` ${this.currency.value}` : ''
    const fraction = this.getFraction()
    const number = strFill('9', (this.length.value?.n || 0) + 1)

    return `${number}${fraction ? `.${strFill('8', fraction)}` : ''}${currency}`
  })

  readonly formatCurrency = this.intl.value.currency(this.format, { maximumFractionDigits: 2 })
  readonly formatNumber = this.intl.value.number(this.format, { maximumFractionDigits: 9 })

  protected readonly ifNumber = computed<boolean>(() => ['currency', 'number'].indexOf(this.type.value) !== -1)

  protected readonly rubber = computed<AssociativeType<MaskSpecialItemType> | undefined>(() => {
    const data = {} as AssociativeType<MaskSpecialItemType>

    if (this.ifNumber.value) {
      data.n = {
        rubber: true,
        transitionChar: this.decimal.value,
        maxLength: 12
      }

      if (this.fraction.value === true) {
        data.f = {
          rubber: true,
          maxLength: 6
        }
      }
    } else if (typeof this.special.value === 'object') {
      forEach<MaskSpecialItemType, string, void>(this.special.value, (item, index) => {
        if (item?.rubber) {
          data[index] = item
        }
      })
    }

    return Object.values(data).length > 0 ? data : undefined
  })

  protected readonly transitionChars = computed<string[]>(() => {
    const data = [] as string[]

    if (this.rubber.value) {
      forEach(this.rubber.value, item => {
        if (item?.transitionChar) {
          if (typeof item.transitionChar === 'string') {
            data.push(item.transitionChar)
          } else {
            data.push(...item.transitionChar)
          }
        }
      })
    }

    return data
  })

  protected add (index: string): this {
    if (index in this.length.value) {
      this.length.value[index]++
    } else {
      this.length.value[index] = 1
    }

    return this
  }

  get (mask?: string): string {
    let value = mask || ''

    forEach<number, string, void>(this.length.value, (length, index) => {
      value = value.replace(getExp(index, 'ig', '([:value]+)'), (all: string) => {
        return `${all}${strFill(index, length)}`
      })
    })
    console.log('value', value, this.length.value)
    return value
  }

  getMaskByNumber (): string[] {
    const data = this.type.value === 'currency' ? this.formatCurrency.value : this.formatNumber.value

    return data
      .replace(/9/ig, 'n')
      .replace(/8/ig, 'f')
      .split('')
  }

  protected getFraction (): number {
    if (this.type.value === 'currency') {
      return 2
    } else if (this.length.value?.f) {
      return this.length.value.f + 1
    } else if (typeof this.fraction.value === 'number') {
      return this.fraction.value
    } else {
      return 0
    }
  }

  protected getItem (special: string) {
    return this.rubber.value?.[special]
  }

  protected getValue (special: string): MaskItemType | undefined {
    return this.values?.value?.[special]
  }

  protected ifMatch (char: string): boolean {
    return !!char.match(this.match.value)
  }

  pop (index: string): this {
    if (
      index in this.length.value &&
      --this.length.value[index] <= 0
    ) {
      delete this.length.value[index]
    }

    this.transition.reset()
    return this
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
        this.add(index)
        this.transition.reset()
        return true
      }
    }

    return false
  }

  setValues (values: ComputedRef<MaskItemsType>): this {
    this.values = values
    return this
  }
}
