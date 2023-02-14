import { onUnmounted, Ref, ref, watchEffect } from 'vue'
import { EventItem } from '../../classes/EventItem'

export class ScrollbarBorder {
  private event?: EventItem

  private top = ref<boolean>(false)
  private bottom = ref<boolean>(false)

  constructor (
    private readonly element: Ref<HTMLElement>,
    private readonly border: Ref<boolean>
  ) {
    watchEffect(() => this.init())
    onUnmounted(() => this.stop())
  }

  init (): this {
    if (this.element.value) {
      if (this.border.value) {
        this.go()
      } else {
        this.stop()
      }
    }

    return this
  }

  getStyle () {
    return {
      'is-bottom': this.bottom,
      'is-top': this.top
    }
  }

  private go (): this {
    if (this.event) {
      this.event.go()
    } else {
      this.event = new EventItem<any, Event>(
        this.element as Ref<HTMLElement>,
        () => this.on()
      )
        .setType(['scroll'])
        .go()

      this.on()
    }

    return this
  }

  private stop (): this {
    if (this.event) {
      this.event.stop()
    }

    return this
  }

  private on (): void {
    const element = this.element.value

    if (element) {
      this.top.value = element.scrollTop > 8
      this.bottom.value = element.scrollTop < element.scrollHeight - element.clientHeight - 8
    }
  }
}
