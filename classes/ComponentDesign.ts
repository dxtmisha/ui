import { ComponentItem } from './ComponentItem'
import { AssociativeType } from '../constructors/types'

export class ComponentDesign {
  static designItems = {} as AssociativeType<ComponentItem>

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
