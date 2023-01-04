import { NumberOrStringOrDateType } from '../constructors/types'

export class To {
  static date<Type = Date> (value?: NumberOrStringOrDateType): Type | Date {
    if (value instanceof Date) {
      return value
    } else if (value === undefined) {
      return new Date()
    } else if (typeof value === 'number') {
      return new Date(value)
    } else {
      let date = value as string
      let timeZone = '' as string

      value.replace(/^([\s\S]+)([-+]\d{2}:?\d{2})$/, (all: string, d: string, z: string) => {
        date = d
        timeZone = z

        return ''
      })

      const data = date.match(/^\d{4}-\d{2}-\d{2}$/)
        ? `${date} 00:00:00`
        : date.match(/^\d{4}-\d{2}$/)
          ? `${date}-01 00:00:00`
          : date.match(/^\d{2}:\d{2}$/)
            ? `2000-01-01 ${date}:00`
            : date.match(/^\d{2}:\d{2}:\d{2}$/)
              ? `2000-01-01 ${date}`
              : date

      return new Date(data.replace(' ', 'T') + timeZone)
    }
  }

  static number<Type = number> (value: number | string): Type | number {
    if (typeof value === 'number') {
      return value
    } else {
      const number = parseFloat(
        value
          .replace(',', '.')
          .replace(/[^\d.]+/ig, '')
      )

      return Number.isNaN(number) ? 0 : number
    }
  }
}
