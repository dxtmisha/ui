import { onMounted, onUnmounted } from 'vue'
import { EventItem } from '../../classes/EventItem'
import { frame } from '../../functions'

import { MotionScrollFocus } from './MotionScrollFocus'
import { MotionScrollPage } from './MotionScrollPage'
import { UseElementFocus } from '../Use/UseElementFocus'

import { CallbackEmitType } from '../types'

export const MAX_COUNTER = 4

export class MotionScrollEvent {
  private event?: EventItem
  private counter = 0 as number
  private go = false as boolean

  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly emit: CallbackEmitType,
    private readonly page: MotionScrollPage,
    private readonly element: UseElementFocus,
    private readonly focus: MotionScrollFocus
  ) {
    onMounted(() => {
      this.event = new EventItem(this.element.itemByEvent, () => {
        this.init()
      })
        .setType(['scroll'])
        .go()
    })

    onUnmounted(() => this.event?.stop())
  }

  private init () {
    this.counter = MAX_COUNTER

    if (!this.go) {
      this.go = true

      frame(
        () => this.update(),
        () => this.isNext(),
        () => this.end()
      )
    }
  }

  private update (): void {
    if (this.counter > 0) {
      this.counter--

      this.focus.update()

      if (this.focus.isNew(this.page.get())) {
        this.edit()
      }
    }
  }

  private edit (): this {
    const data = this.focus.getData()

    if (data) {
      if (this.page.get() !== undefined) {
        if (data.isFirst) {
          this.emit('on-first', data)
        }

        if (data.isLast) {
          this.emit('on-last', data)
        }

        this.emit('on-focus', data)
      }

      this.page.set(data.page)
    }

    return this
  }

  private isNext (): boolean {
    return this.counter > 0
  }

  private end (): void {
    this.go = false
  }
}
