import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { props } from './props'

import { AssociativeType } from '../types'
import { MotionAxisSetupType } from './types'
import { MotionAxisToSelected } from './MotionAxisToSelected'
import { MotionAxisToAxis } from './MotionAxisToAxis'
import { MotionAxisToTransition } from './MotionAxisToTransition'
import { MotionAxisToGo } from './MotionAxisToGo'

export abstract class MotionAxisToComponentAbstract extends ComponentAbstract<HTMLDivElement> {
  static readonly instruction = props as AssociativeType
  static readonly emits = ['on-status']

  protected readonly selector: MotionAxisToSelected
  protected readonly axis: MotionAxisToAxis
  protected readonly transition: MotionAxisToTransition

  protected readonly go: MotionAxisToGo

  constructor (
    props: AssociativeType & object,
    context: AssociativeType & object
  ) {
    super(props, context)

    this.selector = new MotionAxisToSelected(this.refs.selected)
    this.axis = new MotionAxisToAxis()
    this.transition = new MotionAxisToTransition()

    this.go = new MotionAxisToGo(
      this.selector,
      this.axis,
      this.transition
    )
  }

  setup (): MotionAxisSetupType {
    return {
      ...this.getBasic(),

      selectedBind: this.selector.item,

      axis: this.axis.item,
      transition: this.transition.item,

      onStatus: (event: AssociativeType) => this.context.emit('on-status', event),

      ...this.go.getSetup()
    }
  }
}
