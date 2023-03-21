import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { props } from './props'

import { MotionAxisSlideCoordinates } from './MotionAxisSlideCoordinates'
import { MotionAxisSlideStatus } from './MotionAxisSlideStatus'

import { AssociativeType } from '../types'
import { MotionAxisSlideSetupType } from './types'

export abstract class MotionAxisSlideComponentAbstract extends ComponentAbstract<HTMLDivElement> {
  static readonly instruction = props as AssociativeType
  static readonly emits = ['on-status']

  protected coordinates: MotionAxisSlideCoordinates
  protected status: MotionAxisSlideStatus

  // eslint-disable-next-line no-useless-constructor
  constructor (
    props: AssociativeType & object,
    context: AssociativeType & object
  ) {
    super(props, context)

    this.coordinates = new MotionAxisSlideCoordinates(
      this.element,
      this.getStyleName()
    )

    this.status = new MotionAxisSlideStatus(
      this.coordinates,
      this.refs.name,
      this.refs.selected
    )
  }

  setup (): MotionAxisSlideSetupType {
    const classes = this.getClasses()
    const styles = this.getStyles({
      main: this.coordinates.getStyle()
    })

    return {
      ...this.getBasic(),
      classes,
      styles,

      isShow: this.status.show,
      status: this.status.item,

      onTransitionend: (event: TransitionEvent) => this.onTransitionend(event)
    }
  }

  protected onTransitionend (event: TransitionEvent): void {
    if (event.propertyName === 'transform') {
      this.context.emit('on-status', {
        name: this.props.name,
        status: this.status.get(),
        event
      })
    }

    this.status.reset()
  }
}
