import { computed, Ref, watch } from 'vue'
import { ElementItem } from './ElementItem'
import { EventItem } from './EventItem'
import { ElementType, RefOrElementType } from '../constructors/types'

export class EventResize<E = ElementType> {
  protected readonly element: ElementItem<E>

  protected activity = false as boolean
  protected event?: EventItem

  constructor (
    element: RefOrElementType<E | undefined> | string,
    protected readonly callback: (target: E | undefined) => void
  ) {
    this.element = new ElementItem<E>(element)

    watch(this.element.element, (newElement, oldElement) => {
      if (
        this.activity &&
        this.observer.value &&
        newElement !== oldElement
      ) {
        this.removeEvent().addEvent(newElement)
      }
    })
  }

  public readonly observer = computed<ResizeObserver | undefined>(() => {
    try {
      return new ResizeObserver(() => {
        this.callback(this.element.get())
      })
    } catch (e) {
      return undefined
    }
  })

  go (): this {
    if (!this.activity) {
      this.activity = true
      this.addEvent(this.element.get())
    }

    return this
  }

  stop (): this {
    if (this.activity) {
      this.removeEvent()
      this.activity = false
    }

    return this
  }

  protected getEvent () {
    if (!this.event) {
      this.event = new EventItem(
        this.element.element as Ref<HTMLElement>,
        () => this.callback(this.element.get())
      ).setType(['resize'])
    }

    return this.event
  }

  private addEvent (element?: E): this {
    if (this.observer.value === undefined) {
      this.getEvent().go()
    } else if (element !== undefined) {
      this.observer.value?.observe(element as Element)
    }

    return this
  }

  private removeEvent (): this {
    this.observer.value?.disconnect() || this.getEvent().stop()
    return this
  }
}
