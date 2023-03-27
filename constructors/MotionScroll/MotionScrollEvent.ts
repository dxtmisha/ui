import { MotionScrollFocus } from './MotionScrollFocus'
import { MotionScrollPage } from './MotionScrollPage'
import { UseElementFocus } from '../Use/UseElementFocus'
import { UseScrollEvent } from '../Use/UseScrollEvent'

import { CallbackEmitType } from '../types'

export class MotionScrollEvent extends UseScrollEvent {
  constructor (
    protected readonly emit: CallbackEmitType,
    protected readonly page: MotionScrollPage,
    protected readonly element: UseElementFocus,
    protected readonly focus: MotionScrollFocus
  ) {
    super(element)
  }

  protected resize (): void {
    this.focus.update()

    if (this.focus.isNew(this.page.get())) {
      this.edit()
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
}
