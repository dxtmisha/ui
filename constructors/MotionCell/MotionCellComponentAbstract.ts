import { ComponentAbstract } from '../../classes/ComponentAbstract'

import { MotionCellGo } from './MotionCellGo'
import { MotionCellItems } from './MotionCellItems'
import { MotionCellTo } from './MotionCellTo'

import { AssociativeType } from '../types'
import { MotionCellSetupType } from './types'

export abstract class MotionCellComponentAbstract extends ComponentAbstract<HTMLDivElement> {
  static readonly instruction = {} as AssociativeType

  protected readonly go: MotionCellGo
  protected readonly items: MotionCellItems

  protected readonly to: MotionCellTo

  // eslint-disable-next-line no-useless-constructor
  constructor (
    props: AssociativeType & object,
    context: AssociativeType & object
  ) {
    super(props, context)

    this.go = new MotionCellGo()
    this.items = new MotionCellItems(
      this.element,
      this.getName(),
      this.getStyleName()
    )

    this.to = new MotionCellTo(
      this.go,
      this.items
    )
  }

  setup (): MotionCellSetupType {
    const classes = this.getClasses({
      main: {
        ...this.go.getClasses()
      }
    })

    return {
      ...this.getBasic(),
      classes,

      onTransition: (event: TransitionEvent) => this.to.on(event),

      ...this.to.getSetup()
    }
  }
}
