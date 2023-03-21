import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { props } from './props'

import { AssociativeType } from '../types'
import { MotionAxisSetupType } from './types'

export abstract class MotionAxisComponentAbstract extends ComponentAbstract<HTMLDivElement> {
  static readonly instruction = props as AssociativeType
  static readonly emits = ['on-status']

  // eslint-disable-next-line no-useless-constructor
  constructor (
    props: AssociativeType & object,
    context: AssociativeType & object
  ) {
    super(props, context)
  }

  setup (): MotionAxisSetupType {
    const classes = this.getClasses()

    return {
      ...this.getBasic(),
      classes,
      onStatus: (event: AssociativeType) => this.context.emit('on-status', event)
    }
  }
}
