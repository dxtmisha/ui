import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { props } from './props'

import { MotionTransformStatus } from './MotionTransformStatus'
import { WindowHook } from '../Window/WindowHook'

import { AssociativeType } from '../types'
import { MotionTransformClassesType, MotionTransformSetupType } from './types'
import { MotionTransformOpen } from './MotionTransformOpen'

export abstract class MotionTransformComponentAbstract extends ComponentAbstract<HTMLDivElement> {
  static readonly instruction = props as AssociativeType

  protected readonly status: MotionTransformStatus

  protected readonly hook: WindowHook
  protected readonly open: MotionTransformOpen

  // eslint-disable-next-line no-useless-constructor
  constructor (
    props: AssociativeType & object,
    context: AssociativeType & object
  ) {
    super(props, context)

    this.status = new MotionTransformStatus()

    this.hook = new WindowHook(
      this.refs?.beforeOpening,
      this.refs?.preparation,
      this.refs?.opening
    )
    this.open = new MotionTransformOpen(
      this.status,
      this.hook
    )
  }

  setup (): MotionTransformSetupType {
    const classes = this.getClasses<MotionTransformClassesType>()
    const styles = this.getStyles()

    return {
      ...this.getBasic(),
      classes,
      styles
    }
  }
}
