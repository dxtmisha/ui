import { onMounted, onUnmounted } from 'vue'
import { EventItem } from '../../classes/EventItem'
import { UseElementFocus } from './UseElementFocus'
import { frame } from '../../functions'

export class UseScrollEvent {
  protected readonly MAX_COUNTER = 8 as number

  private event?: EventItem
  private counter = 0 as number
  private go = false as boolean

  constructor (
    protected readonly element: UseElementFocus
  ) {
    onMounted(() => {
      this.event = new EventItem(this.element.itemByEvent, () => {
        this.init()
      })
        .setType(['scroll', 'resize'])
        .go()
    })

    onUnmounted(() => this.event?.stop())
  }

  protected resize (): void {
    //  Abstract
  }

  private init () {
    this.counter = this.MAX_COUNTER

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
      this.resize()
    }
  }

  private isNext (): boolean {
    return this.counter > 0
  }

  private end (): void {
    this.go = false
  }
}
