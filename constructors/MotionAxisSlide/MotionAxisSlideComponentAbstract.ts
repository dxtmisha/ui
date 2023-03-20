import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { props } from './props'

import { MotionAxisSlideCoordinates } from './MotionAxisSlideCoordinates'
import { MotionAxisSlideStatus } from './MotionAxisSlideStatus'

import { AssociativeType } from '../types'
import { MotionAxisSlideSetupType } from './types'
import { watch } from 'vue'

export abstract class MotionAxisSlideComponentAbstract extends ComponentAbstract<HTMLDivElement> {
  static readonly instruction = props as AssociativeType
  static readonly emits = ['on-end']

  protected status: MotionAxisSlideStatus
  protected coordinates: MotionAxisSlideCoordinates

  // eslint-disable-next-line no-useless-constructor
  constructor (
    props: AssociativeType & object,
    context: AssociativeType & object
  ) {
    super(props, context)

    this.status = new MotionAxisSlideStatus(
      this.refs.name,
      this.refs.selected,
      this.refs.preparation
    )
    this.coordinates = new MotionAxisSlideCoordinates(
      this.element,
      this.getStyleName()
    )

    watch(this.status.item, status => {
      if (status === 'preparation') {
        requestAnimationFrame(() => this.coordinates.update())
      } else {
        this.coordinates.resize()
      }
    })
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
    this.context.emit('on-end', {
      name: this.props.name,
      event
    })
  }
}
