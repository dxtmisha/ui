import { executeFunction } from '../functions'
import { AssociativeType } from '../constructors/types'

export class DefaultConfiguration {
  private static values = {} as AssociativeType

  static init (design: string) {
    return (prop: string, defaultValue = undefined as any) =>
      () => this._getValue(prop, design) || this._getValue(prop, 'global') || executeFunction(defaultValue)
  }

  private static _getValue (prop: string, key: string): any {
    return this.values?.[key]?.[prop]
  }

  static validator<T = any> (values: T[]): (value: T) => boolean {
    return (value: T) => values.indexOf(value) !== -1
  }

  static validatorOrNumber<T = any> (values: T[]): (value: number | T) => number | boolean {
    return (value: number | T) => {
      if (typeof value === 'number') {
        return value
      } else {
        return values.indexOf(value) !== -1
      }
    }
  }
}
