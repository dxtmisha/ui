import { AssociativeType } from '../constructors/types'
import { toKebabCase } from '../functions'

export class ComponentItem {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly code: string,
    private readonly instruction: AssociativeType
  ) {
  }

  private basic?: string
  private design?: string
  private name?: string

  public getBasicClassName (): string {
    if (!(this.basic)) {
      this.basic = this.code.replace('.', '-')
    }

    return this.basic
  }

  public getDesign (): string {
    if (!(this.design)) {
      this.design = toKebabCase(this.code.split('.', 1)[0])
    }

    return this.design
  }

  public getName (): string {
    if (!(this.name)) {
      this.name = toKebabCase(
        this.code
          ?.replace(/^([^.]+.)/ig, '')
          ?.replace('.', '-')
      )
    }

    return this.name
  }
}
