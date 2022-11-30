import { AssociativeType } from '../constructors/types'
import { toKebabCase } from '../functions'

export class ComponentItem {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly code: string,
    private readonly instruction: AssociativeType
  ) {
  }

  private name?: string

  public getName (): string {
    if (!(this.name)) {
      this.name = toKebabCase(
        this.code
          ?.replace(/^([^.]+.)/ig, '')
          ?.replace('.', '-')
      )
      console.log('Up', this.name)
    }

    return this.name
  }
}
