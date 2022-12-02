import { CLASS_SUB, CLASS_VAL, ComponentProperty } from './ComponentProperty'
import { toKebabCase } from '../functions'
import { AssociativeType, ComponentPropertiesType, NumberOrStringType } from '../constructors/types'

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
  private properties?: ComponentPropertiesType

  public getBasicClassName (): string {
    if (!(this.basic)) {
      this.basic = this.code.replace('.', '-')
    }

    return this.basic
  }

  public getClassName (
    name = [] as string[],
    status = [] as NumberOrStringType[]
  ): string {
    let value = this.getBasicClassName()

    if (name.length > 0) {
      value += `${CLASS_SUB}${name.join(CLASS_SUB)}`
    }

    if (status.length > 0) {
      value += `${CLASS_VAL}${status.join(CLASS_VAL)}`
    }

    return toKebabCase(value)
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

  public getProperties (): ComponentPropertiesType {
    if (!(this.properties)) {
      const data = {} as ComponentPropertiesType

      ComponentProperty.getProperties(this.code, this.instruction)
        .forEach(name => {
          const link = ComponentProperty.getByClassType(this.code, name)
          const index = link?.value || `${this.code}.${name}`
          const className = ComponentProperty.toClass(index)
          const values = ComponentProperty.getValues(index)

          data[name] = {
            index,
            className,
            classValue: `${className}${CLASS_VAL}`,
            values
          }
        })

      this.properties = data
    }

    return this.properties
  }
}
