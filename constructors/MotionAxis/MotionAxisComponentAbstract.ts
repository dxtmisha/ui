import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { props } from './props'

import { MotionAxisPreparation } from './MotionAxisPreparation'

import { MotionAxisCoordinates } from './MotionAxisCoordinates'
import { MotionAxisSelected } from './MotionAxisSelected'
import { MotionAxisSlides } from './MotionAxisSlides'
import { MotionAxisStatus } from './MotionAxisStatus'

import { AssociativeType, NumberOrStringType } from '../types'
import { MotionAxisClassesType, MotionAxisSetupType } from './types'

export abstract class MotionAxisComponentAbstract extends ComponentAbstract<HTMLDivElement> {
  static readonly instruction = props as AssociativeType

  protected readonly preparation: MotionAxisPreparation

  protected readonly slides: MotionAxisSlides
  protected readonly selected: MotionAxisSelected
  protected readonly status: MotionAxisStatus

  protected readonly coordinates: MotionAxisCoordinates

  // eslint-disable-next-line no-useless-constructor
  constructor (
    props: AssociativeType & object,
    context: AssociativeType & object
  ) {
    super(props, context)

    this.preparation = new MotionAxisPreparation(this.refs.selected)

    this.slides = new MotionAxisSlides()
    this.selected = new MotionAxisSelected(
      this.slides,
      this.refs.selected
    )
    this.status = new MotionAxisStatus(
      this.slides,
      this.selected
    )

    this.coordinates = new MotionAxisCoordinates(
      this.status,
      this.getStyleName()
    )
  }

  setup (): MotionAxisSetupType {
    const classes = this.getClasses<MotionAxisClassesType>()
    const styles = this.getStyles({
      main: {
        ...this.coordinates.getStyle()
      }
    })

    return {
      ...this.getBasic(),
      classes,
      styles,

      preparation: this.preparation.item,

      list: this.status.item,
      slides: this.slides,

      onEnd: (name: NumberOrStringType, event: TransitionEvent) => undefined
    }
  }
}
