import { ComponentAbstract } from '../../../classes/ComponentAbstract'
import { AssociativeType, ComponentBaseType } from '../../types'

export abstract class ExampleComponentAbstract extends ComponentAbstract {
  static readonly instruction = {} as AssociativeType

  // eslint-disable-next-line no-useless-constructor
  protected constructor (
    props: AssociativeType & object,
    context: AssociativeType & object
  ) {
    super(props, context)
  }

  setup (): ComponentBaseType {
    const classes = this.getClasses()
    const styles = this.getStyles()

    return {
      ...this.getBasic(),
      classes,
      styles
    }
  }
}
