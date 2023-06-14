import { props } from './props'
import { AssociativeType } from '../../constructors/types'
import { ComponentAbstract } from '../../classes/ComponentAbstract'

export class TestComponent extends ComponentAbstract {
  static readonly code = 'md2.test' as string
  static readonly instruction = props as AssociativeType

  setup () {
    const classes = this.getClasses()
    const styles = this.getStyles()

    return {
      ...this.getBasic(),
      classes,
      styles
    }
  }
}
