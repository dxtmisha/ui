import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { props } from './props'

import { MotionAxisSelected } from './MotionAxisSelected'
import { MotionAxisSlides } from './MotionAxisSlides'
import { MotionAxisStatus } from './MotionAxisStatus'

import { AssociativeType, NumberOrStringType } from '../types'
import { MotionAxisClassesType, MotionAxisSetupType } from './types'

export abstract class MotionAxisComponentAbstract extends ComponentAbstract<HTMLDivElement> {
  static readonly instruction = props as AssociativeType

  protected readonly slides: MotionAxisSlides
  protected readonly selected: MotionAxisSelected
  protected readonly status: MotionAxisStatus

  // eslint-disable-next-line no-useless-constructor
  constructor (
    props: AssociativeType & object,
    context: AssociativeType & object
  ) {
    super(props, context)

    this.slides = new MotionAxisSlides()
    this.selected = new MotionAxisSelected(
      this.slides,
      this.refs.selected
    )
    this.status = new MotionAxisStatus(
      this.slides,
      this.selected
    )
  }

  setup (): MotionAxisSetupType {
    const classes = this.getClasses<MotionAxisClassesType>()
    const styles = this.getStyles()

    return {
      ...this.getBasic(),
      classes,
      styles,

      slides: this.slides,

      onTransitionend: (name: NumberOrStringType, event: TransitionEvent) => undefined
    }
  }
}
