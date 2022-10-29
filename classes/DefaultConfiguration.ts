import {executeFunction} from "../functions";
import {AssociativeType} from "../constructors/types";

export class DefaultConfiguration {
  private static values = {} as AssociativeType

  static init(design: string) {
    return (prop: string, defaultValue = undefined as any) =>
      () => this._getValue(prop, design) || this._getValue(prop, 'global') || executeFunction(defaultValue)
  }

  private static _getValue(prop: string, key: string): any {
    return this.values?.[key]?.[prop]
  }

  validator<T = any>(values: T[]): (value: T) => boolean {
    return (value: T) => values.indexOf(value) !== -1
  }
}
