import { forEach, replaceRecursive } from '../functions'
import { AssociativeType } from '../constructors/types'
import d from './../constructors/properties.json'

export class PropertiesVarService {
  protected static designMain = {} as AssociativeType
  protected static designComponent: AssociativeType

  static addMain (designs: AssociativeType[]): void {
    [d, ...designs].forEach(design => {
      // console.log('initDesign', this.initDesign(design))
      replaceRecursive(this.designMain, design)
    })

    console.log('this.designMain', this.designMain)
  }

  private static initDesign (design: AssociativeType): AssociativeType {
    const data = {} as AssociativeType

    /*
    forEach(design, (property, index) => {

    })
     */

    return data
  }
}
