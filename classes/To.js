'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.To = void 0
/**
 * Class for type conversion
 *
 * Класс для преобразования типов
 */
class To {
  /**
     * Conversion to array
     *
     * Преобразование в массив
     * @param value input value / входное значение
     */
  static array (value) {
    return Array.isArray(value) ? value : [value]
  }

  /**
     * Conversion to Date object
     *
     * Преобразование в объект Date
     * @param value input value / входное значение
     */
  static date (value) {
    if (value instanceof Date) {
      return value
    } else if (value === undefined) {
      return new Date()
    } else if (typeof value === 'number') {
      return new Date(value)
    } else {
      let date = value
      let timeZone = ''
      value.replace(/^([\s\S]+)([-+]\d{2}:?\d{2})$/, (all, d, z) => {
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

  /**
     * The method parses a string argument and returns a floating point number
     *
     * Метод принимает строку в качестве аргумента и возвращает десятичное число
     * @param value the value to parse / текстовая строка
     */
  static number (value) {
    if (typeof value === 'number') {
      return value
    } else {
      const number = parseFloat(value.replace(/[^\d., ]+/ig, '')
        .replace(/(,)([0-9]{1,2}|[0-9]{4,})$/, '.$2')
        .replace(/^([0-9]{4,})(,)([0-9]{3})$/, '$1.$3')
        .replace(/(?<= [0-9]{3})( )(?=[0-9]{3}$)/, '!')
        .replace(/(?<=,[0-9]{3})(,)(?=[0-9]{3}$)/, '!')
        .replace(/([ ,])(?![0-9]+$)/ig, '')
        .replace(/(?<=^[0-9]{1,3})([ ,])(?=[0-9]{3}$)/, '')
        .replace(/(!)/, '')
        .replace(/([ ,])(?=[0-9]{3}$)/, '.'))
      return Number.isNaN(number) ? 0 : number
    }
  }

  /**
     * Convert a String to Camel Case
     *
     * Преобразование строки в Camel Case
     * @param value value / значения
     */
  static camelCase (value) {
    return value
      .toString()
      .replace(/[-.]([a-z])/g, (all, char) => `${char.toUpperCase()}`)
  }

  /**
     * Convert a string to kebab case
     *
     * Преобразование строки в kebab case
     * @param value value / значения
     */
  static kebabCase (value) {
    return value
      .toString()
      .replace(/^[A-Z]/g, all => all.toLowerCase())
      .replace(/[A-Z]/g, all => `-${all.toLowerCase()}`)
  }
}
exports.To = To
// # sourceMappingURL=To.js.map
