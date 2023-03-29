import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { props } from './props'

import { MotionStickyElement } from './MotionStickyElement'
import { MotionStickyEvent } from './MotionStickyEvent'
import { MotionStickyItems } from './MotionStickyItems'

import { AssociativeType } from '../types'
import { MotionStickySetupType } from './types'

export abstract class MotionStickyComponentAbstract extends ComponentAbstract<HTMLDivElement> {
  static readonly instruction = props as AssociativeType

  protected readonly item: MotionStickyElement
  protected readonly items: MotionStickyItems

  protected readonly motion: MotionStickyEvent

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
    this.items = new MotionStickyItems(this.item)

    this.motion = new MotionStickyEvent(
      this.item,
      this.items,
      this.refs.className
    )
  }

  setup (): MotionStickySetupType {
    const classes = this.getClasses()

    return {
      ...this.getBasic(),
      classes,

      id: this.item.getId()
    }
  }
}
