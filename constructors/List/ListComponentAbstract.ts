import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { props } from './props'

import { AssociativeType } from '../types'
import { ListClassesType, ListSetupType } from './types'

export abstract class ListComponentAbstract extends ComponentAbstract<HTMLDivElement> {
  static readonly instruction = props as AssociativeType
  static readonly emits = ['on-click', 'on-trailing'] as string[]

  protected readonly stylesProps = [] as string[]

  // eslint-disable-next-line no-useless-constructor
  constructor (
    props: AssociativeType & object,
    context: AssociativeType & object
  ) {
    super(props, context)
  }

  setup (): ListSetupType {
    const classes = this.getClasses<ListClassesType>()
    const styles = this.getStyles()

    return {
      ...this.getBasic(),
      classes,
      styles
    }
  }
}
