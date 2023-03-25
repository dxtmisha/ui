import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { props } from './props'

import { AssociativeType } from '../types'
import { MotionScrollSetupType } from './types'

export abstract class MotionScrollComponentAbstract extends ComponentAbstract<HTMLDivElement> {
  static readonly instruction = props as AssociativeType

  // eslint-disable-next-line no-useless-constructor
  protected constructor (
    props: AssociativeType & object,
    context: AssociativeType & object
  ) {
    super(props, context)
  }

  setup (): MotionScrollSetupType {
    const classes = this.getClasses()

    return {
      ...this.getBasic(),
      classes
    }
  }
}
