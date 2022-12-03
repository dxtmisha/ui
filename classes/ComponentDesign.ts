import { ComponentItem } from './ComponentItem'
import { DefaultConfiguration } from './DefaultConfiguration'
import { AssociativeType } from '../constructors/types'

export class ComponentDesign {
  static designDefaults = {} as AssociativeType<DefaultConfiguration>
  static designItems = {} as AssociativeType<ComponentItem>

  static getDefault (code: string): DefaultConfiguration {
    if (!(code in this.designDefaults)) {
      this.designDefaults[code] = new DefaultConfiguration(code)
    }

    return this.designDefaults[code]
  }

  static getItem (
    code: string,
    instruction: AssociativeType
  ): ComponentItem {
    if (!(code in this.designItems)) {
      this.designItems[code] = new ComponentItem(code, instruction)
    }

    return this.designItems[code]
  }
}
