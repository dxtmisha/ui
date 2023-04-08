import { computed, ComputedRef } from 'vue'
import { getRef } from '../functions/ref'

import { GeoIntlStatic } from './GeoIntlStatic'

import { GeoDateType, ItemType } from '../constructors/types'
import { IntlDateType, IntlNumberType, IntlStringType } from '../constructors/typesRef'

/**
 * The Intl namespace object contains several constructors as well as functionality common
 * to the internationalization constructors and other language sensitive functions. Collectively,
 * they comprise the ECMAScript Internationalization API, which provides language sensitive
 * string comparison, number formatting, date and time formatting, and more
 *
 * Объект Intl является пространством имён для API интернационализации ECMAScript, предоставляющим
 * языка-зависимое сравнение строк, форматирование чисел и дат со временем. Конструкторы объектов
 * Collator, NumberFormat и DateTimeFormat являются свойствами объекта Intl. На этой странице
 * описаны эти свойства, а также общая функциональность конструкторов интернационализации и других
 * языка-зависимых функций
 */
export class GeoIntl extends GeoIntlStatic {
  display (value?: IntlStringType): ComputedRef<string>
  display (value?: IntlStringType, type?: Intl.DisplayNamesOptions['type']): ComputedRef<string>
  display (value?: IntlStringType, options?: Intl.DisplayNamesOptions): ComputedRef<string>
  /**
   * The consistent translation of language, region and script display names
   *
   * Последовательный перевод отображаемых названий языка, региона и скрипта
   * @param value the code to provide depends on the type / предоставляемый код зависит от типа
   * @param typeOptions an object with some or all of the following properties / объект
   * с некоторыми или всеми из следующих свойств
   */
  display (
    value?: IntlStringType,
    typeOptions?: Intl.DisplayNamesOptions['type'] | Intl.DisplayNamesOptions
  ): ComputedRef<string | undefined> {
    return computed(() => this.displayStatic(getRef(value), typeOptions))
  }

  /**
   * Get display names of language
   *
   * Получить отображаемые имена языка
   * @param value the code to provide depends on the type / предоставляемый код зависит от типа
   * @param style the formatting style to use / используемый стиль форматирования
   */
  language (
    value?: IntlStringType,
    style?: Intl.RelativeTimeFormatStyle
  ): ComputedRef<string | undefined> {
    return computed(() => this.languageStatic(getRef(value), style))
  }

  /**
   * Get display names of region
   *
   * Получить отображаемые имена региона
   * @param value the code to provide depends on the type / предоставляемый код зависит от типа
   * @param style the formatting style to use / используемый стиль форматирования
   */
  countryName (
    value?: IntlStringType,
    style?: Intl.RelativeTimeFormatStyle
  ): ComputedRef<string | undefined> {
    return computed(() => this.countryNameStatic(getRef(value), style))
  }

  /**
   * In basic use without specifying a locale, a formatted string
   *
   * При обычном использовании без указания локали форматированная строка
   * @param value a number, bigint, or string, to format / число для форматирования
   * @param options an object with some or all properties / объект с некоторыми
   * или всеми свойствами
   */
  number (
    value: IntlNumberType,
    options?: Intl.NumberFormatOptions
  ): ComputedRef<string> {
    return computed(() => this.numberStatic(getRef(value), options))
  }

  /**
   * Символ десятичная дробь
   * @protected
   */
  numberDecimal (): ComputedRef<string> {
    return computed(() => this.numberDecimalStatic())
  }

  currency (value: IntlStringType): ComputedRef<string>
  currency (value: IntlNumberType, currency: string): ComputedRef<string>
  currency (value: IntlNumberType, options: Intl.NumberFormatOptions): ComputedRef<string>
  /**
   * Currency formatting
   *
   * Форматирование валюты
   * @param value a number, bigint, or string, to format / число для форматирования
   * @param currencyOptions the currency to use in currency formatting / валюта для
   * использования в форматировании валюты
   * @param numberOnly do not display the currency symbol / не выводить значок валюты
   */
  currency (
    value: IntlNumberType,
    currencyOptions?: string | Intl.NumberFormatOptions,
    numberOnly = false as boolean
  ): ComputedRef<string> {
    return computed(() => this.currencyStatic(getRef(value), currencyOptions, numberOnly))
  }

  unit (value: IntlStringType): ComputedRef<string>
  unit (value: IntlNumberType, unit: string): ComputedRef<string>
  unit (value: IntlNumberType, options: Intl.NumberFormatOptions): ComputedRef<string>
  /**
   * Unit formatting
   * If the style is 'unit', a unit property must be provided
   *
   * Форматирование юнитов
   * @param value a number, bigint, or string, to format / число для форматирования
   * @param unitOptions the unit to use in unit formatting / блок для использования
   * в форматировании блока
   */
  unit (
    value: IntlNumberType,
    unitOptions?: string | Intl.NumberFormatOptions
  ): ComputedRef<string> {
    return computed(() => this.unitStatic(getRef(value), unitOptions))
  }

  /**
   * Number as a percentage
   *
   * Число в виде процента
   * @param value a number, bigint, or string, to format / число для форматирования
   * @param options an object with some or all properties / объект с некоторыми
   * или всеми свойствами
   */
  percent (
    value: IntlNumberType,
    options?: Intl.NumberFormatOptions
  ): ComputedRef<string> {
    return computed(() => this.percentStatic(getRef(value), options))
  }

  /**
   * Number as a percentage (unit)
   *
   * Число в виде процента (единица)
   * @param value a number, bigint, or string, to format / число для форматирования
   * @param options an object with some or all properties / объект с некоторыми
   * или всеми свойствами
   */
  percentBy100 (
    value: IntlNumberType,
    options?: Intl.NumberFormatOptions
  ): ComputedRef<string> {
    return computed(() => this.percentStaticBy100(getRef(value), options))
  }

  relative (value: IntlDateType): ComputedRef<string>
  relative (value: IntlDateType, style: Intl.RelativeTimeFormatStyle): ComputedRef<string>
  relative (value: IntlDateType, options: Intl.RelativeTimeFormatOptions): ComputedRef<string>
  /**
   * Enables language-sensitive relative time formatting
   *
   * Включает форматирование относительного времени с учетом языка
   * @param value a number, bigint, or string, to format / число для форматирования
   * @param styleOptions the length of the internationalized message / длина
   * интернационализированного сообщения
   */
  relative (
    value: IntlDateType,
    styleOptions?: Intl.RelativeTimeFormatStyle | Intl.RelativeTimeFormatOptions
  ): ComputedRef<string> {
    return computed(() => this.relativeStatic(getRef(value), styleOptions))
  }

  date (value: IntlDateType): ComputedRef<string>
  date (value: IntlDateType, type: GeoDateType): ComputedRef<string>
  date (value: IntlDateType, type: GeoDateType, style: Intl.DateTimeFormatOptions['month']): ComputedRef<string>
  date (value: IntlDateType, type: GeoDateType, style: Intl.DateTimeFormatOptions['month'], hour24: boolean): ComputedRef<string>
  date (value: IntlDateType, type: GeoDateType, options: Intl.DateTimeFormatOptions): ComputedRef<string>
  /**
   * Enables language-sensitive date and time formatting
   *
   * Конструктором объектов, включающих языка-зависимое форматирование даты и времени.
   * @param value the date to format / дата для форматирования
   * @param type type of data format / тип формата data
   * @param styleOptions the representation of the month / представление месяца
   * @param hour24 whether to use 12-hour time / использовать ли 12-часовое время
   */
  date (
    value: IntlDateType,
    type?: GeoDateType,
    styleOptions?: Intl.DateTimeFormatOptions['month'] | Intl.DateTimeFormatOptions,
    hour24?: boolean
  ): ComputedRef<string> {
    return computed(
      () => this.dateStatic(
        getRef(value),
        type,
        styleOptions,
        hour24
      )
    )
  }

  month (): ComputedRef<string>
  month (value: IntlDateType): ComputedRef<string>
  month (value: IntlDateType, style: Intl.DateTimeFormatOptions['month']): ComputedRef<string>
  /**
   * Names of months
   *
   * Названия месяцев
   * @param value the date to format / дата для форматирования
   * @param style the representation of the month / представление месяца
   */
  month (
    value?: IntlDateType,
    style?: Intl.DateTimeFormatOptions['month']
  ): ComputedRef<string> {
    return computed(() => this.monthStatic(getRef(value), style))
  }

  /**
   * Array to list of months
   *
   * Массив в список месяцев
   * @param style the representation of the month / представление месяца
   */
  months (
    style?: Intl.DateTimeFormatOptions['month']
  ): ComputedRef<ItemType<string | undefined>[]> {
    return computed(() => this.monthsStatic(style))
  }

  weekday (): ComputedRef<string>
  weekday (value: IntlDateType): ComputedRef<string>
  weekday (value: IntlDateType, style: Intl.DateTimeFormatOptions['weekday']): ComputedRef<string>
  /**
   * Returns names of days of the week
   *
   * Возвращает названия дней недели
   * @param value the date to format / дата для форматирования
   * @param style the representation of the weekday / представление о дне недели
   */
  weekday (
    value?: IntlDateType,
    style?: Intl.DateTimeFormatOptions['weekday']
  ): ComputedRef<string> {
    return computed(() => this.weekdayStatic(getRef(value), style))
  }

  /**
   * An array of the list of names of the days of the week
   *
   * Массив из списка названий дней недели
   * @param style the representation of the weekday / представление о дне недели
   */
  weekdays (style?: Intl.DateTimeFormatOptions['weekday']): ComputedRef<ItemType<string | undefined>[]> {
    return computed(() => this.weekdaysStatic(style))
  }

  /**
   * Time
   *
   * Время
   * @param value the date to format / дата для форматирования
   */
  time (value: IntlDateType): ComputedRef<string> {
    return computed(() => this.timeStatic(getRef(value)))
  }
}
