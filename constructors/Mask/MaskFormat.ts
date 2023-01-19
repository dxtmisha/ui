import { computed, Ref } from 'vue'
import { GeoIntl } from '../../classes/GeoIntl'
import { MaskRubberItem } from './MaskRubberItem'
import { MaskType } from './MaskType'
import { strFill } from '../../functions'
import { AssociativeType } from '../types'
import { MaskSpecialItemType } from './types'

export class MaskFormat {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly type: MaskType,
    protected readonly rubber: MaskRubberItem,
    protected readonly currency: Ref<string>,
    protected readonly fraction: Ref<boolean | number>
  ) {
  }

  protected readonly intl = computed<GeoIntl>(() => new GeoIntl())
  protected readonly format = computed<string>(() => `${this.toNumber()}${this.toFraction()}${this.toCurrency()}`)

  protected readonly formatCurrency = computed<string>(
    () => this.intl.value.currency(this.format, { maximumFractionDigits: 2 }).value
  )

  protected readonly formatNumber = computed<string>(
    () => this.intl.value.number(this.format, { maximumFractionDigits: 9 }).value
  )

  getCurrency (): string {
    return this.formatCurrency.value
  }

  getDecimal (): string[] {
    return [this.intl.value.numberDecimal().value, '.']
  }

  getFraction (): number {
    if (this.type.isCurrency()) {
      return 2
    } else if (this.rubber.is('f')) {
      return this.rubber.getItem('f') + 1
    } else if (typeof this.fraction.value === 'number') {
      return this.fraction.value
    } else {
      return 0
    }
  }

  getMaskByNumber (): string[] {
    return (this.type.isCurrency() ? this.getCurrency() : this.getNumber())
      .replace(/9/ig, 'n')
      .replace(/8/ig, 'f')
      .split('')
  }

  getNumber (): string {
    return this.formatNumber.value
  }

  getRubber (): AssociativeType<MaskSpecialItemType> {
    return {
      n: {
        rubber: true,
        transitionChar: this.getDecimal(),
        maxLength: 12
      },
      f: {
        rubber: this.isFractionRubber(),
        maxLength: 6
      }
    }
  }

  isFractionRubber (): boolean {
    return this.fraction.value === true
  }

  protected toCurrency (): string {
    return this.type.isCurrency() && ` ${this.currency.value}` ? this.currency.value : ''
  }

  protected toFraction (): string {
    const data = this.getFraction()
    return data ? `.${strFill('8', data)}` : ''
  }

  protected toNumber (): string {
    return strFill('9', (this.rubber.getItem('n') || 0) + 1)
  }
}
