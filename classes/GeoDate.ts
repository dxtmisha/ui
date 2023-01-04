import { computed, ComputedRef, ref, Ref, watch } from 'vue'
import { GeoAbstract } from './GeoAbstract'
import { GeoIntl } from './GeoIntl'
import { To } from './To'
import {
  GeoCodeType,
  GeoDateType,
  GeoFirstDayType,
  GeoHoursType, GeoTimeZoneStyleType,
  NumberOrStringOrDateType
} from '../constructors/types'

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

  clone (): Date {
    return new Date(this.date.value)
  }

  cloneClass (): GeoDate {
    return new (this.constructor as typeof GeoDate)(
      this.clone(),
      this.type.value,
      this.code
    )
  }

  cloneDayEnd (): GeoDate {
    return this.cloneClass()
      .setDay(1)
      .moveByMonth(1)
      .moveByDay(-1)
  }

  cloneDayNext (): GeoDate {
    return this.cloneClass()
      .moveByDay(1)
  }

  cloneDayPrevious (): GeoDate {
    return this.cloneClass()
      .moveByDay(-1)
  }

  cloneDayStart (): GeoDate {
    return this.cloneClass()
      .setDay(1)
  }

  cloneMonthEnd (): GeoDate {
    return this.cloneClass()
      .setMonth(12)
  }

  cloneMonthNext (): GeoDate {
    return this.cloneClass()
      .setDay(1)
      .moveByMonth(+1)
  }

  cloneMonthPrevious (): GeoDate {
    return this.cloneClass()
      .setDay(1)
      .moveByMonth(-1)
  }

  cloneMonthStart (): GeoDate {
    return this.cloneClass()
      .setMonth(1)
  }

  cloneWeekdayFirst () {
    return this
      .cloneDayStart()
      .cloneWeekdayStart()
  }

  cloneWeekdayEnd (): GeoDate {
    return this
      .cloneWeekdayStart()
      .moveByDay(6)
  }

  cloneWeekdayLast () {
    return this
      .cloneDayEnd()
      .cloneWeekdayEnd()
  }

  cloneWeekdayNext (): GeoDate {
    return this.cloneWeekdayStart()
      .moveByDay(7)
  }

  cloneWeekdayPrevious (): GeoDate {
    return this.cloneWeekdayStart()
      .moveByDay(-7)
  }

  cloneWeekdayStart (): GeoDate {
    const weekday = this.date.value.getDay()
    const weekdayFirst = this.getFirstDayCode()
    const move = (weekdayFirst.value === 6 ? -1 : weekdayFirst.value) - weekday
    const date = this.cloneClass()

    return date.moveByDay(move)
  }

  getDate (): Date {
    return this.date.value
  }

  getDay (): number {
    return this.day.value
  }

  getFirstDayCode (): ComputedRef<GeoFirstDayType> {
    return computed(() => {
      const value = this.firstDay.value

      if (value === 'Sa') {
        return 6
      } else if (value === 'Su') {
        return 0
      } else {
        return 1
      }
    })
  }

  getHour (): number {
    return this.hour.value
  }

  getHour24 (): boolean {
    return this.hour24.value
  }

  getHoursType (): ComputedRef<GeoHoursType> {
    return computed(() => {
      const date = this.clone()
      date.setHours(23)

      return date.toLocaleTimeString(this.lang.value, { hour: '2-digit' }).match(/23/ig)
        ? '24'
        : '12'
    })
  }

  getMaxDay (): ComputedRef<number> {
    return computed(() => this.month.value > 0 ? this.cloneDayEnd().day.value : 0)
  }

  getMinute (): number {
    return this.minute.value
  }

  getMonth (): number {
    return this.month.value
  }

  getSecond (): number {
    return this.second.value
  }

  getTimeZone (style?: GeoTimeZoneStyleType): ComputedRef<string> {
    return computed(() => {
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
    })
  }

  getTimeZoneOffset (): ComputedRef<number> {
    return computed(() => this.date.value.getTimezoneOffset())
  }

  getType (): string {
    return this.type.value
  }

  getYear (): number {
    return this.year.value
  }

  moveByDay (value: number): this {
    this.setDay(this.date.value.getDate() + value)
    return this
  }

  moveByHour (value: number): this {
    this.setHour(this.date.value.getHours() + value)
    return this
  }

  moveByMinute (value: number): this {
    this.setMinute(this.date.value.getMinutes() + value)
    return this
  }

  moveByMonth (value: number): this {
    this.setMonth(this.date.value.getMonth() + 1 + value)
    return this
  }

  moveBySecond (value: number): this {
    this.setSecond(this.date.value.getSeconds() + value)
    return this
  }

  moveByYear (value: number): this {
    this.setYear(this.date.value.getFullYear() + value)
    return this
  }

  setDate (value: NumberOrStringOrDateType): this {
    this.date.value = To.date(value)
    this.update()

    return this
  }

  setDay (value: number): this {
    this.date.value.setDate(value)
    this.update()

    return this
  }

  setHour (value: number): this {
    this.date.value.setHours(value)
    this.update()

    return this
  }

  setHour24 (value: boolean): this {
    this.hour24.value = value

    return this
  }

  setMinute (value: number): this {
    this.date.value.setMinutes(value)
    this.update()

    return this
  }

  setMonth (value: number): this {
    this.date.value.setMonth(value - 1)
    this.update()

    return this
  }

  setSecond (value: number): this {
    this.date.value.setSeconds(value)
    this.update()

    return this
  }

  setType (value: GeoDateType): this {
    this.type.value = value

    return this
  }

  setYear (value: number): this {
    this.date.value.setFullYear(value)
    this.update()

    return this
  }

  protected init (): this {
    watch(this.second, value => this.date.value.setSeconds(value))
    watch(this.minute, value => this.date.value.setMinutes(value))
    watch(this.hour, value => this.date.value.setHours(value))
    watch(this.day, value => this.date.value.setDate(value))
    watch(this.month, value => this.date.value.setMonth(value - 1))
    watch(this.year, value => this.date.value.setFullYear(value))

    return this
  }

  protected update (): this {
    this.second.value = this.date.value.getSeconds()
    this.minute.value = this.date.value.getMinutes()
    this.hour.value = this.date.value.getHours()
    this.day.value = this.date.value.getDate()
    this.month.value = this.date.value.getMonth() + 1
    this.year.value = this.date.value.getFullYear()

    return this
  }
}
