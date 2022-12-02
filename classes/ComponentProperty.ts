import { forEach, toKebabCase } from '../functions'
import { AssociativeType, ComponentPropOptionsType } from '../constructors/types'

export const CLASS_SUB = '__'
export const CLASS_VAL = '--'

export class ComponentProperty {
  static designMain: AssociativeType

  static codeToKebabCase (code: string, name?: string): string {
    return toKebabCase(`${code}${name ? `.${name}` : ''}`)
  }

  static getByType (index: string, type: string): AssociativeType<string> | undefined {
    const design = this.designMain?.[index]

    if (this.isType(design, type)) {
      return typeof design === 'string' ? { type: design } : design
    } else {
      return undefined
    }
  }

  static getByDefaultType (code: string, name?: string): AssociativeType<string> | undefined {
    return this.getByType(this.codeToKebabCase(code, `${name}.default`), 'default')
  }

  static getBySubClassType (code: string, name?: string): AssociativeType<string> | undefined {
    return this.getByType(this.codeToKebabCase(code, name), 'subclass')
  }

  static getByValueClassType (code: string, name?: string): AssociativeType<string> | undefined {
    return this.getByType(this.codeToKebabCase(code, name), 'link-class')
  }

  static getProperties (
    code: string,
    instruction: AssociativeType
  ): string[] {
    return forEach<any, string, string | undefined>(instruction, (instruction, name) => {
      return this.isProperty(code, name) ? name : undefined
    }, true) as string[]
  }

  static getSubClasses (code: string) {
    const data = [] as string[]
    const exp = `${code}.`

    forEach<any, string, void>(this.designMain, (item, name) => {
      if (
        name.match(exp) &&
        this.getBySubClassType(name)
      ) {
        data.push(name)
      }
    })

    return data
  }

  static getValues (index: string): string[] {
    const data = [] as string[]
    const exp = `${index}.`

    forEach<any, string, void>(this.designMain, (item, name) => {
      if (name.match(exp)) {
        data.push(name.replace(exp, ''))
      }
    })

    return data
  }

  static isProperty (code: string, name?: string) {
    return this.codeToKebabCase(code, name) in this.designMain
  }

  private static isType (
    type: string | AssociativeType | undefined,
    name: string
  ): boolean {
    return typeof type === 'string'
      ? name === type
      : name === type?.type
  }

  static toClass (index: string): string {
    return toKebabCase(
      index
        .replace(/\./, '-')
        .replace(/\./g, CLASS_VAL)
    )
  }

  static toProp (prop: any): ComponentPropOptionsType {
    const data = {} as AssociativeType

    if (Array.isArray(prop) || (
      !('type' in prop) &&
      !('required' in prop) &&
      !('default' in prop) &&
      !('validator' in prop)
    )) {
      data.type = prop
    } else {
      [
        'type',
        'required',
        'default',
        'validator'
      ].forEach(key => {
        if (key in prop) {
          data[key] = prop[key]
        }
      })
    }

    return data
  }

  static {
    this.designMain = JSON.parse(process.env.VUE_APP_DESIGNS || '{}')
  }
}
