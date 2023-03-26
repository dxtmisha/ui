import { MotionScrollFocus } from './MotionScrollFocus'
import { MotionScrollElement } from './MotionScrollElement'

export class MotionScrollUpdate {
  private top = 0 as number

  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly element: MotionScrollElement,
    private readonly focus: MotionScrollFocus
  ) {
  }

  onBeforeUpdate (): void {
    this.top = this.getTopByElement()
  }

  onUpdated (): void {
    const distance = this.top - this.getTopByElement()

    if (distance !== 0) {
      this.setScroll(distance)
    }
  }

  getTopByElement (): number {
    return this.focus.getElement()?.getBoundingClientRect().top || 0
  }

  private setScroll (distance: number): this {
    this.element.get().scrollTop -= distance
    return this
  }
}
