import { computed, ComputedRef, ref, Ref, watch } from 'vue'
import { To } from './To'

import { GeoAbstract } from './GeoAbstract'
import { GeoIntl } from './GeoIntl'

import {
  GeoDateType,
  GeoFirstDayType,
  GeoHoursType,
  GeoTimeZoneStyleType,
  NumberOrStringOrDateType
} from '../constructors/types'
import { GeoCodeType } from '../constructors/typesRef'

/**
 * A class for working with dates
 *
 * Класс для работы с датами
 */
export class GeoDate extends GeoAbstract {
  public readonly date: Ref<Date>
  public readonly type: Ref<GeoDateType>
  public readonly hour24: Ref<boolean>

  public readonly second = ref<number>(0)
  public readonly minute = ref<number>(0)
  public readonly hour = ref<number>(0)
  public readonly day = ref<number>(0)
  public readonly month = ref<number>(0)
  public readonly year = ref<number>(0)

  protected intl: GeoIntl

  constructor (
    date?: NumberOrStringOrDateType,
    type?: GeoDateType,
    code?: GeoCodeType
  ) {
    super(code)

    this.date = ref(To.date(date))
    this.type = ref(type || 'date')
    this.hour24 = ref(false)
    this.intl = new GeoIntl(code)

    this.update().init()
  }

  /**
   * Clone the Date object
   *
   * Клонировать объект Date
   */
  clone (): Date {
    return new Date(this.date.value)
  }

  /**
   * Clone the GeoDate object
   *
   * Клонировать объект GeoDate
   */
  cloneClass (): GeoDate {
    return new (this.constructor as typeof GeoDate)(
      this.clone(),
      this.type.value,
      this.code
    )
  }

  /**
   * Clone the GeoDate object and transfer it one month ahead
   *
   * Клонировать объект GeoDate и перевести на 1 месяц вперед
   */
  cloneMonthNext (): GeoDate {
    return this.cloneClass()
      .setDay(1)
      .moveByMonth(+1)
  }

  /**
   * Clone the GeoDate object and transfer it one month back
   *
   * Клонировать объект GeoDate и перевести на 1 месяц назад
   */
  cloneMonthPrevious (): GeoDate {
    return this.cloneClass()
      .setDay(1)
      .moveByMonth(-1)
  }

  /**
   * Clone the GeoDate object and set the month to January
   *
   * Клонировать объект GeoDate и установить месяц на январь
   */
  cloneMonthStart (): GeoDate {
    return this.cloneClass()
      .setMonth(1)
  }

  /**
   * Clone the GeoDate object and move the month to the end of the year
   *
   * Клонировать объект GeoDate и перевести месяц на конец года
   */
  cloneMonthEnd (): GeoDate {
    return this.cloneClass()
      .setMonth(12)
  }

  /**
   * Returns the first day of the week according to the current date
   *
   * Возвращает первый день недели по текущей дате
   */
  cloneWeekdayStart (): GeoDate {
    const weekday = this.date.value.getDay()
    const weekdayFirst = this.getFirstDayCodeStatic()
    const move = (weekdayFirst === 6 ? -1 : weekdayFirst) - weekday
    const date = this.cloneClass()

    return date.moveByDay(move)
  }

  /**
   * Returns the last day of the week according to the current date
   *
   * Возвращает последний день недели по текущей дате
   */
  cloneWeekdayEnd (): GeoDate {
    return this
      .cloneWeekdayStart()
      .moveByDay(6)
  }

  /**
   * Returns the next week according to the current date
   *
   * Возвращает следующую неделю по текущей дате
   */
  cloneWeekdayNext (): GeoDate {
    return this.cloneWeekdayStart()
      .moveByDay(7)
  }

  /**
   * Returns the previous week according to the current date
   *
   * Возвращает предыдущую неделю по текущей дате
   */
  cloneWeekdayPrevious (): GeoDate {
    return this.cloneWeekdayStart()
      .moveByDay(-7)
  }

  /**
   * Returns the first day of the week according to the current month
   *
   * Возвращает первый день недели по текущему месяцу
   */
  cloneWeekdayFirst () {
    return this
      .cloneDayStart()
      .cloneWeekdayStart()
  }

  /**
   * Returns the last day of the week according to the current month
   *
   * Возвращает последний день недели по текущему месяцу
   */
  cloneWeekdayLast () {
    return this
      .cloneDayEnd()
      .cloneWeekdayEnd()
  }

  /**
   * Clone the GeoDate object and move by 1 day
   *
   * Клонировать объект GeoDate и перевести на 1 день
   */
  cloneDayNext (): GeoDate {
    return this.cloneClass()
      .moveByDay(1)
  }

  /**
   * Clone the GeoDate object and go back by 1 day
   *
   * Клонировать объект GeoDate и вернуться на 1 день
   */
  cloneDayPrevious (): GeoDate {
    return this.cloneClass()
      .moveByDay(-1)
  }

  /**
   * Clone the GeoDate object and move the day to the beginning of the month
   *
   * Клонировать объект GeoDate и перевести день на начало месяца
   */
  cloneDayStart (): GeoDate {
    return this.cloneClass()
      .setDay(1)
  }

  /**
   * Clone the GeoDate object and move the day to the end of the month
   *
   * Клонировать объект GeoDate и перевести день на конец месяца
   */
  cloneDayEnd (): GeoDate {
    return this.cloneClass()
      .setDay(1)
      .moveByMonth(1)
      .moveByDay(-1)
  }

  /**
   * Returns the type of data output
   *
   * Возвращает тип вывода данных
   */
  getType (): string {
    return this.type.value
  }

  /**
   * Returns a Date object
   *
   * Возвращает объект Date
   */
  getDate (): Date {
    return this.date.value
  }

  /**
   * Returns the last day of the week
   *
   * Возвращает последний день недели
   */
  getMaxDay (): ComputedRef<number> {
    return computed(() => this.getMaxDayStatic())
  }

  /**
   * Returns the last day of the week
   *
   * Возвращает последний день недели
   */
  getMaxDayStatic (): number {
    return this.month.value > 0 ? this.cloneDayEnd().day.value : 0
  }

  /**
   * Returns the code of the first day of the week
   *
   * Возвращает код первого дня недели
   */
  getFirstDayCode (): ComputedRef<GeoFirstDayType> {
    return computed(() => this.getFirstDayCodeStatic())
  }

  /**
   * Returns the code of the first day of the week
   *
   * Возвращает код первого дня недели
   */
  getFirstDayCodeStatic (): GeoFirstDayType {
    const value = this.firstDay.value

    if (value === 'Sa') {
      return 6
    } else if (value === 'Su') {
      return 0
    } else {
      return 1
    }
  }

  /**
   * Returns the format of hours
   *
   * Возвращает формат часов
   */
  getHoursType (): ComputedRef<GeoHoursType> {
    return computed(() => this.getHoursTypeStatic())
  }

  /**
   * Returns the format of hours
   *
   * Возвращает формат часов
   */
  getHoursTypeStatic (): GeoHoursType {
    const date = this.clone()
    date.setHours(23)

    return date.toLocaleTimeString(this.lang.value, { hour: '2-digit' }).match(/23/ig)
      ? '24'
      : '12'
  }

  /**
   * Whether to use 12-hour time
   *
   * Использовать ли 12-часовой формат времени
   */
  getHour24 (): boolean {
    return this.hour24.value
  }

  /**
   * Метод возвращает смещение часового пояса относительно часового пояса UTC
   * в минутах для текущей локали
   *
   * The method returns the difference, in minutes, between
   * a date as evaluated in the UTC time zone, and the same date as evaluated
   * in the local time zone
   */
  getTimeZoneOffset (): ComputedRef<number> {
    return computed(() => this.getTimeZoneOffsetStatic())
  }

  /**
   * Метод возвращает смещение часового пояса относительно часового пояса UTC
   * в минутах для текущей локали
   *
   * The method returns the difference, in minutes, between
   * a date as evaluated in the UTC time zone, and the same date as evaluated
   * in the local time zone
   */
  getTimeZoneOffsetStatic (): number {
    return this.date.value.getTimezoneOffset()
  }

  /**
   * Returns the time zone as a string
   *
   * Возвращает временную зону в виде строки
   * @param style the style of the returned data / стиль возвращаемых данных
   */
  getTimeZone (style?: GeoTimeZoneStyleType): ComputedRef<string> {
    return computed(() => this.getTimeZoneStatic(style))
  }

  /**
   * Returns the time zone as a string
   *
   * Возвращает временную зону в виде строки
   * @param style the style of the returned data / стиль возвращаемых данных
   */
  getTimeZoneStatic (style?: GeoTimeZoneStyleType): string {
    const offset = this.date.value.getTimezoneOffset()

    if (style === 'minute') {
      return offset.toString()
    } else {
      const hour = offset / 60 * -1

      if (style === 'hour') {
        return this.intl.number(Math.trunc(hour), { signDisplay: 'always' }).value
      } else {
        const numberHour = this.intl.number(Math.trunc(hour), {
          signDisplay: 'always',
          minimumIntegerDigits: 2
        }).value
        const numberMinute = hour.toString().match(/.\d+/) ? '30' : '00'

        if (style === 'RFC') {
          return `${numberHour}${numberMinute}`
        } else {
          return `${numberHour}:${numberMinute}`
        }
      }
    }
  }

  /**
   * The method returns the year of the specified date according to local time
   *
   * Метод возвращает год указанной даты по местному времени
   */
  getYear (): number {
    return this.year.value
  }

  /**
   * The method returns the month in the specified date according to local time,
   * as a zero-based value
   *
   * Метод возвращает месяц указанной даты по местному времени, нумерация
   * месяцев начинается с нуля для первого месяца в году
   */
  getMonth (): number {
    return this.month.value
  }

  /**
   * The method returns the day of the month for the specified date according to local time
   *
   * Метод возвращает день месяца указанной даты по местному времени
   */
  getDay (): number {
    return this.day.value
  }

  /**
   * The method returns the hour for the specified date, according to local time
   *
   * Метод возвращает часы указанной даты по местному времени
   */
  getHour (): number {
    return this.hour.value
  }

  /**
   * The method returns the minutes in the specified date according to local time
   *
   * Метод возвращает минуты указанной даты по местному времени
   */
  getMinute (): number {
    return this.minute.value
  }

  /**
   * The method returns the seconds in the specified date according to local time
   *
   * Метод возвращает секунды указанной даты по местному времени
   */
  getSecond (): number {
    return this.second.value
  }

  /**
   * Output of standard data
   *
   * Вывод стандартных данных
   * @param timeZone add time zone / добавить временную зону
   */
  standard (timeZone = true as boolean): ComputedRef<string> {
    return computed(() => this.standardStatic(timeZone))
  }

  /**
   * Output of standard data
   *
   * Вывод стандартных данных
   * @param timeZone add time zone / добавить временную зону
   */
  standardStatic (timeZone = true as boolean): string {
    const geo = new GeoDate(
      this.date.value,
      this.type.value,
      'en-GB'
    )

    let value = ''

    if (['datetime', 'date', undefined, 'month'].indexOf(this.type.value) !== -1) {
      value += `${geo.localeYearStatic()}-${geo.localeMonthStatic('2-digit')}`
    }

    if (['datetime', 'date', undefined].indexOf(this.type.value) !== -1) {
      value += `-${geo.localeDayStatic('2-digit')}`
    }

    if (['datetime', 'time'].indexOf(this.type.value) !== -1) {
      value += `${value !== '' ? 'T' : ''}${geo.localeStatic({
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      })}`

      if (timeZone) {
        value += geo.getTimeZoneStatic()
      }
    }

    return value
  }

  locale (): ComputedRef<string>
  locale (style: Intl.DateTimeFormatOptions['month']): ComputedRef<string>
  locale (options: Intl.DateTimeFormatOptions): ComputedRef<string>
  /**
   * Enables language-sensitive date and time formatting
   *
   * Конструктором объектов, включающих языка-зависимое форматирование даты и времени
   * @param styleOptions the representation of the month / представление месяца
   */
  locale (
    styleOptions?: Intl.DateTimeFormatOptions['month'] | Intl.DateTimeFormatOptions
  ): ComputedRef<string> {
    return computed(() => this.localeStatic(styleOptions))
  }

  /**
   * Enables language-sensitive date and time formatting
   *
   * Конструктором объектов, включающих языка-зависимое форматирование даты и времени
   * @param styleOptions the representation of the month / представление месяца
   */
  localeStatic (
    styleOptions?: Intl.DateTimeFormatOptions['month'] | Intl.DateTimeFormatOptions
  ): string {
    if (typeof styleOptions === 'object') {
      const options = {} as Intl.DateTimeFormatOptions

      if (this.hour24.value) {
        options.hour12 = false
      }

      return this.date.value.toLocaleString(this.lang.value, {
        ...options,
        ...styleOptions
      })
    } else {
      return this.intl.dateStatic(
        this.date.value,
        this.type.value,
        styleOptions,
        this.hour24.value
      )
    }
  }

  /**
   * Returns the formatted year
   *
   * Возвращает отформатированный год
   * @param style the representation of the month / представление месяца
   */
  localeYear (
    style = 'numeric' as Intl.DateTimeFormatOptions['year']
  ): ComputedRef<string> {
    return computed(() => this.localeYearStatic(style))
  }

  /**
   * Returns the formatted year
   *
   * Возвращает отформатированный год
   * @param style the representation of the month / представление месяца
   */
  localeYearStatic (
    style = 'numeric' as Intl.DateTimeFormatOptions['year']
  ): string {
    return this.localeStatic({ year: style })
  }

  /**
   * Returns the formatted month
   *
   * Возвращает отформатированный месяц
   * @param style the representation of the month / представление месяца
   */
  localeMonth (
    style = 'long' as Intl.DateTimeFormatOptions['month']
  ): ComputedRef<string> {
    return computed(() => this.localeMonthStatic(style))
  }

  /**
   * Returns the formatted month
   *
   * Возвращает отформатированный месяц
   * @param style the representation of the month / представление месяца
   */
  localeMonthStatic (
    style = 'long' as Intl.DateTimeFormatOptions['month']
  ): string {
    return this.localeStatic({ month: style })
  }

  /**
   * Returns the formatted day
   *
   * Возвращает отформатированный день
   * @param style the representation of the month / представление месяца
   */
  localeDay (
    style = 'numeric' as Intl.DateTimeFormatOptions['day']
  ): ComputedRef<string> {
    return computed(() => this.localeDayStatic(style))
  }

  /**
   * Returns the formatted day
   *
   * Возвращает отформатированный день
   * @param style the representation of the month / представление месяца
   */
  localeDayStatic (
    style = 'numeric' as Intl.DateTimeFormatOptions['day']
  ): string {
    return this.localeStatic({ day: style })
  }

  /**
   * Returns the formatted hour
   *
   * Возвращает отформатированный час
   * @param style the representation of the month / представление месяца
   */
  localeHour (
    style = 'numeric' as Intl.DateTimeFormatOptions['hour']
  ): ComputedRef<string> {
    return computed(() => this.localeHourStatic(style))
  }

  /**
   * Returns the formatted hour
   *
   * Возвращает отформатированный час
   * @param style the representation of the month / представление месяца
   */
  localeHourStatic (
    style = 'numeric' as Intl.DateTimeFormatOptions['hour']
  ): string {
    return this.localeStatic({ hour: style })
  }

  /**
   * Returns the formatted minute
   *
   * Возвращает отформатированную минуту
   * @param style the representation of the month / представление месяца
   */
  localeMinute (
    style = 'numeric' as Intl.DateTimeFormatOptions['minute']
  ): ComputedRef<string> {
    return computed(() => this.localeMinuteStatic(style))
  }

  /**
   * Returns the formatted minute
   *
   * Возвращает отформатированную минуту
   * @param style the representation of the month / представление месяца
   */
  localeMinuteStatic (
    style = 'numeric' as Intl.DateTimeFormatOptions['minute']
  ): string {
    return this.localeStatic({ minute: style })
  }

  /**
   * Returns the formatted second
   *
   * Возвращает отформатированную секунду
   * @param style the representation of the month / представление месяца
   */
  localeSecond (
    style = 'numeric' as Intl.DateTimeFormatOptions['second']
  ): ComputedRef<string> {
    return computed(() => this.localeSecondStatic(style))
  }

  /**
   * Returns the formatted second
   *
   * Возвращает отформатированную секунду
   * @param style the representation of the month / представление месяца
   */
  localeSecondStatic (
    style = 'numeric' as Intl.DateTimeFormatOptions['second']
  ): string {
    return this.localeStatic({ second: style })
  }

  /**
   * Shift the date by a given value in years
   *
   * Сдвинуть дату на заданное значение в годах
   * @param value values for moving / значения для перемещения
   */
  moveByYear (value: number): this {
    this.setYear(this.date.value.getFullYear() + value)
    return this
  }

  /**
   * Shift the date by a given value in months
   *
   * Сдвинуть дату на заданное значение в месяцах
   * @param value values for moving / значения для перемещения
   */
  moveByMonth (value: number): this {
    this.setMonth(this.date.value.getMonth() + 1 + value)
    return this
  }

  /**
   * Shift the date by a given value in days
   *
   * Сдвинуть дату на заданное значение в днях
   * @param value values for moving / значения для перемещения
   */
  moveByDay (value: number): this {
    this.setDay(this.date.value.getDate() + value)
    return this
  }

  /**
   * Shift the date by a given value in hours
   *
   * Сдвинуть дату на заданное значение в часах
   * @param value values for moving / значения для перемещения
   */
  moveByHour (value: number): this {
    this.setHour(this.date.value.getHours() + value)
    return this
  }

  /**
   * Shift the date by a given value in minutes
   *
   * Сдвинуть дату на заданное значение в минутах
   * @param value values for moving / значения для перемещения
   */
  moveByMinute (value: number): this {
    this.setMinute(this.date.value.getMinutes() + value)
    return this
  }

  /**
   * Shift the date by a given value in seconds
   *
   * Сдвинуть дату на заданное значение в секундах
   * @param value values for moving / значения для перемещения
   */
  moveBySecond (value: number): this {
    this.setSecond(this.date.value.getSeconds() + value)
    return this
  }

  /**
   * Change the type of data output
   *
   * Изменить тип вывода данных
   * @param value type of output / тип вывод
   */
  setType (value: GeoDateType): this {
    this.type.value = value

    return this
  }

  /**
   * Change the date completely
   *
   * Изменять полностью дату
   * @param value an integer value representing the number / целочисленное значение, представляющее число
   */
  setDate (value: NumberOrStringOrDateType): this {
    this.date.value = To.date(value)
    this.update()

    return this
  }

  /**
   * Whether to use 12-hour time
   *
   * Использовать ли 12-часовой формат времени
   * @param value если true, выводить 12-часовой формат времени
   */
  setHour24 (value: boolean): this {
    this.hour24.value = value

    return this
  }

  /**
   * The method sets the full year for a specified date according to local time
   *
   * Метод устанавливает полный год указанной даты по местному времени
   * @param value value / значения
   */
  setYear (value: number): this {
    this.date.value.setFullYear(value)
    this.update()

    return this
  }

  /**
   * The method sets the month for a specified date according to the currently set year
   *
   * Метод устанавливает месяц указанной даты по местному времени
   * @param value value / значения
   */
  setMonth (value: number): this {
    this.date.value.setMonth(value - 1)
    this.update()

    return this
  }

  /**
   * The method changes the day of the month of a given Date instance, based on local time
   *
   * Метод устанавливает день месяца указанной даты по местному времени
   * @param value value / значения
   */
  setDay (value: number): this {
    this.date.value.setDate(value)
    this.update()

    return this
  }

  /**
   * The method sets the hours for a specified date according to local time
   *
   * Метод устанавливает часы указанной даты по местному времени
   * @param value value / значения
   */
  setHour (value: number): this {
    this.date.value.setHours(value)
    this.update()

    return this
  }

  /**
   * The method sets the minutes for a specified date according to local time
   *
   * Метод устанавливает минуты указанной даты по местному времени
   * @param value value / значения
   */
  setMinute (value: number): this {
    this.date.value.setMinutes(value)
    this.update()

    return this
  }

  /**
   * The method sets the seconds for a specified date according to local time
   *
   * Метод устанавливает секунды указанной даты по местному времени
   * @param value value / значения
   */
  setSecond (value: number): this {
    this.date.value.setSeconds(value)
    this.update()

    return this
  }

  /**
   * Updating all values
   *
   * Обновление всех значений
   * @protected
   */
  protected update (): this {
    this.date.value = this.clone()
    this.second.value = this.date.value.getSeconds()
    this.minute.value = this.date.value.getMinutes()
    this.hour.value = this.date.value.getHours()
    this.day.value = this.date.value.getDate()
    this.month.value = this.date.value.getMonth() + 1
    this.year.value = this.date.value.getFullYear()

    return this
  }

  /**
   * Adding listening to changes
   *
   * Добавление прослушивания изменений
   * @protected
   */
  protected init (): this {
    watch(this.second, value => this.date.value.setSeconds(value))
    watch(this.minute, value => this.date.value.setMinutes(value))
    watch(this.hour, value => this.date.value.setHours(value))
    watch(this.day, value => this.date.value.setDate(value))
    watch(this.month, value => this.date.value.setMonth(value - 1))
    watch(this.year, value => this.date.value.setFullYear(value))

    return this
  }
}
