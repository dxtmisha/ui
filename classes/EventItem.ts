import { computed, ComputedRef, isRef, Ref, ref, watch } from 'vue'
import { EventCallbackType, ElementType, RefOrElementType, EventOptionsType } from '../constructors/types'

export class EventItem<R = any> {
  protected readonly type = ref(['click']) as Ref<string[]>
  protected readonly element: Ref<ElementType>

  protected callback: EventCallbackType
  protected dom?: HTMLElement
  protected once?: boolean
  protected options?: EventOptionsType

  protected activity = false as boolean
  protected elementCallback: EventCallbackType<R>

  constructor (
    element: RefOrElementType | string,
    callback = (() => undefined) as EventCallbackType<R>
  ) {
    this.element = isRef(element) ? element : ref(this.findElement(element))
    this.callback = callback
    this.elementCallback = ((event: Event) => this.listener(event)) as EventCallbackType<R>

    watch([this.type, this.element], (
      [newType, newElement]: [string[], ElementType],
      [oldType, oldElement]: [string[], ElementType]
    ) => {
      if (
        this.activity &&
        newElement !== oldElement
      ) {
        oldType.forEach(type => this.removeEvent(type, oldElement))
        newType.forEach(type => this.addEvent(type, newElement))
      }
    })
  }

  protected elementDom = computed(() => {
    return this.dom || (this.element.value === window ? document.body : this.element.value)
  }) as ComputedRef<HTMLElement>

  setCallback (value: EventCallbackType<R>): this {
    this.callback = value
    return this
  }

  setDom (value: ElementType): this {
    const element = this.findElement(value)
    this.dom = (element === window ? document.body : element) as HTMLElement

    return this
  }

  setOptions (value: EventOptionsType): this {
    this.options = value
    return this
  }

  setType (value: string | string[]): this {
    this.type.value = Array.isArray(value) ? value : [value]
    return this
  }

  protected listener (event: Event): any {
    let data = false

    if (
      this.elementDom.value instanceof HTMLElement &&
      this.elementDom.value.closest('html')
    ) {
      if (this.once) {
        this.once = undefined
        this.stop()
      }

      data = this.callback.call(this.element.value, event)
    } else {
      this.stop()
    }

    return data
  }

  go (): this {
    if (!this.activity) {
      this.activity = true
      this.type.value.forEach(type => this.addEvent(type))
    }

    return this
  }

  goOnce (): this {
    this.once = true
    this.go()

    return this
  }

  stop (): this {
    if (this.activity) {
      this.activity = false
      this.type.value.forEach(type => this.removeEvent(type))
    }

    return this
  }

  toggle (go?: boolean): this {
    if (go === undefined) {
      return this.activity
        ? this.stop()
        : this.go()
    } else {
      return go
        ? this.go()
        : this.stop()
    }
  }

  dispatch (detail?: any): this {
    this.type.value.forEach(type => this.element.value.dispatchEvent(new CustomEvent(type, { detail })))
    return this
  }

  private addEvent (type: string, element?: ElementType): this {
    (element || this.element.value).addEventListener(type, this.elementCallback)
    return this
  }

  private removeEvent (type: string, element?: ElementType): this {
    (element || this.element.value).removeEventListener(type, this.elementCallback)
    return this
  }

  private findElement (element?: ElementType | string): ElementType {
    return (typeof element === 'string' ? document.querySelector(element) : element) || document.body
  }
}