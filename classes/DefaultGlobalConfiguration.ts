import { AssociativeType } from '../constructors/types'

export class DefaultGlobalConfiguration {
  private static values = {} as AssociativeType<AssociativeType>

  static getValue (code: string, name: string): any {
    return this.values?.[code]?.[name]
  }

  static setValue (
    code: string,
    name: string,
    value: AssociativeType
  ): void {
    if (!(code in this.values)) {
      this.values[code] = {}
    }

    this.values[code][name] = value
  }

  static setValues (values: AssociativeType<AssociativeType>): void {
    this.values = values
  }
}
