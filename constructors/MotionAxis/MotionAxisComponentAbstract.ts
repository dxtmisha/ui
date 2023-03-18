import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { props } from './props'

import { MotionAxisSlides } from './MotionAxisSlides'

import { AssociativeType, NumberOrStringType } from '../types'
import { MotionAxisSetupType } from './types'

export abstract class MotionAxisComponentAbstract extends ComponentAbstract<HTMLDivElement> {
  static readonly instruction = props as AssociativeType

  protected readonly slides: MotionAxisSlides

  // eslint-disable-next-line no-useless-constructor
  constructor (
    props: AssociativeType & object,
    context: AssociativeType & object
  ) {
    super(props, context)

    this.slides = new MotionAxisSlides()
  }

  setup (): MotionAxisSetupType {
    const classes = this.getClasses()
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
