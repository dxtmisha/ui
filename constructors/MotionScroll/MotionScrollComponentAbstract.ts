import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { props } from './props'

import { MotionScrollElement } from './MotionScrollElement'
import { MotionScrollEvent } from './MotionScrollEvent'
import { MotionScrollFocus } from './MotionScrollFocus'
import { MotionScrollPage } from './MotionScrollPage'
import { MotionScrollUpdate } from './MotionScrollUpdate'
import { ScrollProps } from '../Scrollbar/ScrollProps'

import { AssociativeType } from '../types'
import { MotionScrollSetupType } from './types'

export abstract class MotionScrollComponentAbstract extends ComponentAbstract<HTMLDivElement> {
  static readonly instruction = props as AssociativeType
  static readonly emits = [
    'on-focus',
    'on-first',
    'on-last'
  ] as string[]

  protected readonly scroll: ScrollProps

  protected readonly selected: MotionScrollPage
  protected readonly item: MotionScrollElement
  protected readonly focus: MotionScrollFocus

  protected readonly update: MotionScrollUpdate
  protected readonly event: MotionScrollEvent

  // eslint-disable-next-line no-useless-constructor
  constructor (
    props: AssociativeType & object,
    context: AssociativeType & object
  ) {
    super(props, context)

    this.scroll = new ScrollProps(props)

    this.selected = new MotionScrollPage(this.refs.page)
    this.item = new MotionScrollElement(
      this.element,
      this.refs.elementScroll
    )
    this.focus = new MotionScrollFocus(this.item)

    this.update = new MotionScrollUpdate(
      this.item,
      this.focus
    )
    this.event = new MotionScrollEvent(
      this.context.emit,
      this.selected,
      this.item,
      this.focus
    )
  }

  setup (): MotionScrollSetupType {
    const classes = this.getClasses()

    return {
      ...this.getBasic(),
      classes,

      scrollBind: this.scroll.get(),

      onBeforeUpdate: () => this.update.onBeforeUpdate(),
      onUpdated: () => this.update.onUpdated()
    }
  }
}
