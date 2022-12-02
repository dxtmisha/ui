import { AssociativeType } from '../constructors/types'
import { forEach, toKebabCase } from '../functions'

export const CLASS_SUB = '__'
export const CLASS_VAL = '--'

export class ComponentProperty {
  static designMain: AssociativeType

  static codeToKebabCase (code: string, name?: string): string {
    return toKebabCase(`${code}${name ? `.${name}` : ''}`)
  }

  static getByType (index: string, type: string): AssociativeType | undefined {
    const design = this.designMain?.[index]

    if (this.isType(design, type)) {
      return typeof design === 'string' ? { type: design } : design
    } else {
      return undefined
    }
  }

  static getByClassType (code: string, name: string): AssociativeType<string> | undefined {
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
    return index
      .replace(/\./, '-')
      .replace(/\./g, CLASS_VAL)
  }

  static {
    this.designMain = JSON.parse(process.env.VUE_APP_DESIGNS || '{}')
  }
}
