import { ComponentProperty } from './ComponentProperty'
import { DefaultGlobalConfiguration } from './DefaultGlobalConfiguration'
import { executeFunction } from '../functions/data'
import { AssociativeType } from '../constructors/types'

export class DefaultConfiguration {
  private readonly defaultValues = {} as AssociativeType
  private readonly validatorValues = {} as AssociativeType

  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly code: string
  ) {
  }

  getDefaultValues (name: string): AssociativeType {
    if (!(name in this.defaultValues)) {
      const def = ComponentProperty.getByDefaultType(this.code, name)
      this.defaultValues[name] = def?.value === 'true' || def?.value
    }

    return this.defaultValues[name]
  }

  getValidatorValues<T = string> (name: string): T[] {
    if (!(name in this.validatorValues)) {
      this.validatorValues[name] = ComponentProperty.getValues(this.code, name) as T[]
    }

    return this.validatorValues[name]
  }

  defaultValue<T = any> (name: string, defaultValue?: T): () => T {
    return (): T => {
      return (
        this.getDefaultValues(name) ||
        DefaultGlobalConfiguration.getValue(this.code, name) ||
        defaultValue
      ) as T
    }
  }

  validator<T = string> (name: string): (value: T) => boolean {
    return (value: T) => this.getValidatorValues<T>(name).indexOf(value) !== -1
  }

  validatorAndNumber<T = string> (name: string): (value: T) => boolean {
    return (value: T | number) => {
      if (typeof value === 'number') {
        return true
      } else {
        return this.getValidatorValues<T>(name).indexOf(value) !== -1
      }
    }
  }

  private static values = {} as AssociativeType<AssociativeType>

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
