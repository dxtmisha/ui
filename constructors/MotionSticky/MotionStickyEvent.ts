import { Ref } from 'vue'
import { isIntegerBetween } from '../../functions/data'

import { MotionStickyElement } from './MotionStickyElement'
import { MotionStickyItems, MotionStickyItemsPositionType } from './MotionStickyItems'
import { UseScrollEvent } from '../Use/UseScrollEvent'

export class MotionStickyEvent extends UseScrollEvent {
  protected readonly MAX_COUNTER = 30 as number

  constructor (
    protected readonly element: MotionStickyElement,
    protected readonly items: MotionStickyItems,
    protected readonly className: Ref<string>
  ) {
    super(element)
  }

  protected resize () {
    const rect = this.element.getRect()

    if (rect) {
      this.items.getPosition().forEach(
        item => item.item.classList.toggle(
          this.className.value,
          this.isTop(item, rect) || this.isBottom(item, rect)
        )
      )
    }
  }

  private isTop (item: MotionStickyItemsPositionType, rect: DOMRect): boolean {
    return isIntegerBetween(
      item.top,
      item.rect.top - (rect.top > 0 ? rect.top : 0)
    )
  }

  private isBottom (item: MotionStickyItemsPositionType, rect: DOMRect): boolean {
    return isIntegerBetween(
      item.bottom,
      (rect.bottom > window.innerHeight ? window.innerHeight : rect.bottom) - item.rect.bottom
    )
  }
}
