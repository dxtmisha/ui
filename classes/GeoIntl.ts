import { computed, ComputedRef, isRef } from 'vue'
import { GeoAbstract } from './GeoAbstract'
import {
  GeoDateType,
  ItemType,
  NumberOrStringOrDateType,
  NumberOrStringType,
  RefOrNormalType
} from '../constructors/types'
import { To } from './To'

export type IntlDateType = RefOrNormalType<NumberOrStringOrDateType>
export type IntlNumberType = RefOrNormalType<NumberOrStringType>
export type IntlStringType = RefOrNormalType<string>

export class GeoIntl extends GeoAbstract {
  countryName (value?: IntlStringType, style?: Intl.RelativeTimeFormatStyle): ComputedRef<string | undefined> {
    const options = {
      type: 'region',
      style
    } as Intl.DisplayNamesOptions

    return this.display(value || this.country.value, options)
  }

  currency (value: IntlStringType): ComputedRef<string>
  currency (value: IntlNumberType, currency: string): ComputedRef<string>
  currency (value: IntlNumberType, options: Intl.NumberFormatOptions): ComputedRef<string>
  currency (
    value: IntlNumberType,
    currencyOptions?: string | Intl.NumberFormatOptions
  ): ComputedRef<string> {
    const options = ({
      ...{
        style: 'currency',
        currencyDisplay: 'symbol'
      },
      ...(typeof currencyOptions === 'string' ? { currency: currencyOptions } : currencyOptions || {})
    }) as Intl.NumberFormatOptions

    return computed(() => {
      const number = (isRef(value) ? value.value : value)
        .toString()
        .replace(/^([\S\s]+[\d ])([a-zA-Z]{3})$/i, (all: string, s1: string, s2: string): string => {
          options.currency = s2.toUpperCase()
          return s1
        }) as string

      return this.number(number, options).value
    })
  }

  date (value: IntlDateType): ComputedRef<string>
  date (value: IntlDateType, type: GeoDateType): ComputedRef<string>
  date (value: IntlDateType, type: GeoDateType, style: Intl.DateTimeFormatOptions['month']): ComputedRef<string>
  date (value: IntlDateType, type: GeoDateType, style: Intl.DateTimeFormatOptions['month'], hour24: boolean): ComputedRef<string>
  date (value: IntlDateType, type: GeoDateType, options: Intl.DateTimeFormatOptions): ComputedRef<string>
  date (
    value: IntlDateType,
    type?: GeoDateType,
    styleOptions?: Intl.DateTimeFormatOptions['month'] | Intl.DateTimeFormatOptions,
    hour24?: boolean
  ): ComputedRef<string> {
    return computed(() => {
      const date = To.date(isRef(value) ? value.value : value)
      const display = typeof styleOptions === 'string' ? styleOptions : 'short'
      const displayYear = styleOptions === '2-digit' ? '2-digit' : 'numeric'
      let options = {} as Intl.DateTimeFormatOptions

      if (['datetime', 'date', undefined, 'month'].indexOf(type) !== -1) {
        options.year = displayYear
        options.month = display
      }

      if (['datetime', 'date', undefined].indexOf(type) !== -1) {
        options.day = '2-digit'
      }

      if (type !== undefined) {
        if (['datetime', 'time', 'second'].indexOf(type) !== -1) {
          options.hour = '2-digit'
          options.minute = '2-digit'
        }

        if (['second'].indexOf(type) !== -1) {
          options.second = '2-digit'
        }
      }

      if (hour24) {
        options.hour12 = false
      }

      if (typeof styleOptions !== 'string') {
        options = {
          ...options,
          ...styleOptions
        }
      }

      return date.toLocaleString(this.code.value, options)
    })
  }

  display (value?: IntlStringType): ComputedRef<string>
  display (value?: IntlStringType, type?: Intl.DisplayNamesOptions['type']): ComputedRef<string>
  display (value?: IntlStringType, options?: Intl.DisplayNamesOptions): ComputedRef<string>
  display (
    value?: IntlStringType,
    typeOptions?: Intl.DisplayNamesOptions['type'] | Intl.DisplayNamesOptions
  ): ComputedRef<string | undefined> {
    return computed(() => {
      const intlValue = (isRef(value) ? value.value : value) as string
      let options = { type: 'language' } as Intl.DisplayNamesOptions

      let text

      if (typeOptions) {
        if (typeof typeOptions === 'string') {
          options.type = typeOptions
        } else {
          options = {
            ...options,
            ...typeOptions
          }
        }
      }

      try {
        if (intlValue) {
          text = new Intl.DisplayNames(this.code.value, options).of(intlValue)
        } else if (options.type === 'language') {
          text = new Intl.DisplayNames(this.code.value, options).of(this.lang.value)
        } else if (options.type === 'region') {
          text = new Intl.DisplayNames(this.code.value, options).of(this.country.value)
        }
      } catch (e) {
        text = intlValue
      }

      return text
    })
  }

  language (value?: IntlStringType, style?: Intl.RelativeTimeFormatStyle): ComputedRef<string | undefined> {
    const options = {
      type: 'language',
      style
    } as Intl.DisplayNamesOptions

    return this.display(value || this.lang.value, options)
  }

  month (): ComputedRef<string>
  month (value: IntlDateType): ComputedRef<string>
  month (value: IntlDateType, style: Intl.DateTimeFormatOptions['month']): ComputedRef<string>
  month (
    value?: IntlDateType,
    style?: Intl.DateTimeFormatOptions['month']
  ): ComputedRef<string> {
    return computed(() => {
      const date = To.date(isRef(value) ? value.value : value)
      return Intl.DateTimeFormat(this.code.value, { month: style || 'long' }).format(date)
    })
  }

  months (style?: Intl.DateTimeFormatOptions['month']): ComputedRef<ItemType<string | undefined>[]> {
    return computed(() => {
      const date = new Date()
      const format = Intl.DateTimeFormat(this.code.value, { month: style || 'long' })
      const list = [{
        text: '',
        value: undefined
      }] as ItemType[]

      for (let i = 0; i < 12; i++) {
        date.setMonth(i)
        list.push({
          text: format
            .format(date)
            .replace(/^./, (character) => character.toUpperCase()),
          value: i + 1
        })
      }

      return list
    })
  }

  number (value: IntlNumberType, options?: Intl.NumberFormatOptions): ComputedRef<string> {
    return computed(() => {
      const number = To.number(isRef(value) ? value.value : value)
      return this.numberObject(options)?.format(number) || value.toString()
    })
  }

  protected decimal = computed<string>(() => this.numberObject()?.formatToParts(1.2)?.find(item => item.type === 'decimal')?.value || '.')

  numberDecimal (): ComputedRef<string> {
    return this.decimal
  }

  numberObject (options?: Intl.NumberFormatOptions): Intl.NumberFormat | undefined {
    let object: Intl.NumberFormat | undefined

    try {
      object = new Intl.NumberFormat(this.code.value, options)
    } catch (e) {
    }

    return object
  }

  percent (value: IntlNumberType, options?: Intl.NumberFormatOptions): ComputedRef<string> {
    return this.number(value, {
      style: 'percent',
      ...(options || {})
    } as Intl.NumberFormatOptions)
  }

  percentBy100 (value: IntlNumberType, options?: Intl.NumberFormatOptions): ComputedRef<string> {
    return computed(() => {
      const number = To.number(isRef(value) ? value.value : value) / 100
      return this.percent(number, options).value
    })
  }

  relative (value: IntlDateType): ComputedRef<string>
  relative (value: IntlDateType, style: Intl.RelativeTimeFormatStyle): ComputedRef<string>
  relative (value: IntlDateType, options: Intl.RelativeTimeFormatOptions): ComputedRef<string>
  relative (
    value: IntlDateType,
    styleOptions?: Intl.RelativeTimeFormatStyle | Intl.RelativeTimeFormatOptions
  ): ComputedRef<string> {
    return computed(() => {
      const date = To.date(isRef(value) ? value.value : value)
      const today = new Date()
      const options = ({
        numeric: 'auto',
        ...(typeof styleOptions === 'string' ? { style: styleOptions } : styleOptions || {})
      }) as Intl.RelativeTimeFormatOptions

      let unit = 'second' as Intl.RelativeTimeFormatUnit
      let relative = (date.getTime() - today.getTime()) / 1000
      let text: string

      if (Math.abs(relative) >= 60) {
        unit = 'minute'
        relative /= 60

        if (Math.abs(relative) >= 60) {
          unit = 'hour'
          relative /= 60

          if (Math.abs(relative) >= 24) {
            unit = 'day'
            relative /= 24

            if (Math.abs(relative) >= 30) {
              unit = 'month'
              relative /= 30

              if (Math.abs(relative) >= 12) {
                unit = 'year'
                relative /= 12
              }
            }
          }
        }
      }

      try {
        text = new Intl.RelativeTimeFormat(this.code.value, options).format(Math.round(relative), unit)
      } catch (e) {
        text = ''
      }

      return text
    })
  }

  time (value: IntlDateType): ComputedRef<string> {
    return this.date(value, 'time')
  }

  unit (value: IntlStringType): ComputedRef<string>
  unit (value: IntlNumberType, unit: string): ComputedRef<string>
  unit (value: IntlNumberType, options: Intl.NumberFormatOptions): ComputedRef<string>
  unit (
    value: IntlNumberType,
    unitOptions?: string | Intl.NumberFormatOptions
  ): ComputedRef<string> {
    const options = ({
      ...{ style: 'unit' },
      ...(typeof unitOptions === 'string' ? { unit: unitOptions } : unitOptions || {})
    }) as Intl.NumberFormatOptions

    return computed(() => {
      const number = (isRef(value) ? value.value : value)
        .toString()
        .replace(/^([\S\s]+[\d ])([a-zA-Z]+)$/i, (all: string, s1: string, s2: string): string => {
          options.unit = s2.toLowerCase()
          return s1
        }) as string

      return this.number(number, options).value
    })
  }

  getWeekday (): ComputedRef<string>
  getWeekday (value: IntlDateType): ComputedRef<string>
  getWeekday (value: IntlDateType, style: Intl.DateTimeFormatOptions['weekday']): ComputedRef<string>
  getWeekday (
    value?: IntlDateType,
    style?: Intl.DateTimeFormatOptions['weekday']
  ): ComputedRef<string> {
    return computed(() => {
      const date = To.date(isRef(value) ? value.value : value)
      return Intl.DateTimeFormat(this.code.value, { weekday: style || 'long' }).format(date)
    })
  }

  weekdays (style?: Intl.DateTimeFormatOptions['weekday']): ComputedRef<ItemType<string | undefined>[]> {
    return computed(() => {
      const date = new Date()
      const format = Intl.DateTimeFormat(this.code.value, { weekday: style || 'long' })
      const current = date.getDay() + (this.firstDay.value === 'Mo' ? -1 : 1)
      const list = [{
        text: '',
        value: undefined
      }] as ItemType[]

      date.setDate(date.getDate() - current)

      for (let i = 0; i < 7; i++) {
        list.push({
          text: format
            .format(date)
            .replace(/^./, (character) => character.toUpperCase()),
          value: date.getDay()
        })
        date.setDate(date.getDate() + 1)
      }

      return list
    })
  }
}
