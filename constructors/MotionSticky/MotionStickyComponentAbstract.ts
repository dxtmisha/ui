import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { props } from './props'

import { MotionStickyElement } from './MotionStickyElement'

import { AssociativeType } from '../types'
import { MotionStickySetupType } from './types'

export abstract class MotionStickyComponentAbstract extends ComponentAbstract<HTMLDivElement> {
  static readonly instruction = props as AssociativeType

  protected readonly item: MotionStickyElement

  // eslint-disable-next-line no-useless-constructor
  constructor (
    props: AssociativeType & object,
    context: AssociativeType & object
  ) {
    super(props, context)

    this.item = new MotionStickyElement(
      this.element,
      this.refs.element
    )
  }

  setup (): MotionStickySetupType {
    const classes = this.getClasses()

    return {
      ...this.getBasic(),
      classes
    }
  }
}
