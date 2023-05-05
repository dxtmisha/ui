import { computed, ComputedRef, isRef, Ref, ref, watch } from 'vue'
import { EventCallbackType, ElementType, EventOptionsType } from '../constructors/types'
import { RefOrElementType } from '../constructors/typesRef'

/**
 * Class for working with events
 *
 * Класс для работа с события
 */
export class EventItem<R = any, E = Event> {
  /**
   * A case-sensitive string representing the event type to listen for
   *
   * Чувствительная к регистру строка, представляющая тип обрабатываемого события
   * @protected
   */
  protected readonly type = ref(['click']) as Ref<string[]>

  /**
   * Element
   *
   * Элемент
   * @protected
   */
  protected readonly element: Ref<ElementType>

  /**
   * The object that receives a notification (an object that implements the Event interface)
   * when an event of the specified type occurs
   *
   * Объект, который принимает уведомление, когда событие указанного типа произошло.
   * Это должен быть объект, реализующий интерфейс EventListener или просто функция JavaScript
   * @protected
   */
  protected callback: EventCallbackType<R, E>

  /**
   * Element for checking. If the element is missing in the DOM, the event is turned off
   *
   * Элемент для проверки. Если элемент отсутствует в DOM, событие выключается
   * @protected
   */
  protected dom?: RefOrElementType<ElementType | undefined>

  /**
   * A boolean value indicating that the listener should be invoked at most once after
   * being added. If true, the listener would be automatically removed when invoked
   *
   * Указывает, что обработчик должен быть вызван не более одного раза после добавления.
   * Если true, обработчик автоматически удаляется при вызове
   * @protected
   */
  protected once?: boolean

  /**
   * An object that, in addition of the properties defined in Event()
   *
   * Объект, который помимо свойств, определенных в Event()
   * @protected
   */
  protected options?: EventOptionsType

  /**
   * Event states
   *
   * Состояния события
   * @protected
   */
  protected activity = false as boolean

  /**
   * The object that receives a notification (an object that implements the Event interface)
   * when an event of the specified type occurs. This must be null, an object with a
   * handleEvent() method, or a JavaScript function
   *
   * Объект, который принимает уведомление, когда событие указанного типа произошло.
   * Это должен быть объект, реализующий интерфейс EventListener или просто функция JavaScript
   * @protected
   */
  protected elementCallback: EventCallbackType<R, E> & EventListener

  /**
   * Classes Constructor
   *
   * Конструктор
   * @param element element / элемент
   * @param callback the object that receives a notification (an object that implements the
   * Event interface) when an event of the specified type occurs / Объект, который принимает
   * уведомление, когда событие указанного типа произошло
   */
  constructor (
    element: RefOrElementType | string,
    callback = (() => undefined) as EventCallbackType<R, E>
  ) {
    this.element = isRef(element) ? element : ref(this.findElement(element))
    this.callback = callback
    this.elementCallback = ((event: E) => this.listener(event)) as EventCallbackType<R, E> & EventListener

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

  /**
   * Element for control
   *
   * Элемент для контроля
   * @protected
   */
  protected elementDom = computed(() => {
    return this.getDom() || (this.element.value === window ? document.body : this.element.value)
  }) as ComputedRef<HTMLElement>

  /**
   * Changes the object that receives the notification
   *
   * Изменяеть объект, который принимает уведомление
   * @param value
   */
  setCallback (value: EventCallbackType<R, E>): this {
    this.callback = value
    return this
  }

  /**
   * Returns an element for control
   *
   * Возвращает элемент для контроля
   */
  getDom (): HTMLElement | undefined {
    if (this.dom) {
      const element = this.findElement(isRef(this.dom) ? this.dom.value : this.dom)

      return (element === window ? document.body : element) as HTMLElement
    } else {
      return undefined
    }
  }

  /**
   * Changes the element for control
   *
   * Изменяеть элемент для контроля
   * @param value element / элемент
   */
  setDom (value: RefOrElementType<ElementType | undefined>): this {
    this.dom = value

    return this
  }

  /**
   * Changes the options object, which defines the characteristics of the object
   *
   * Изменяеть объект options, который определяет характеристики объекта
   * @param value object that specifies characteristics / объект options
   */
  setOptions (value: EventOptionsType): this {
    this.options = value
    return this
  }

  /**
   * Changes the type of the processed event
   *
   * Изменяеть тип обрабатываемого события
   * @param value type / тип
   */
  setType (value: string | string[]): this {
    this.type.value = Array.isArray(value) ? value : [value]
    return this
  }

  /**
   * Event initialization
   *
   * Инициализация события
   * @param event an object based on Event describing the event that has occurred,
   * and it returns nothing / событие DOM Event для которого регистрируется обработчик
   * @protected
   */
  protected listener (event: E): any {
    let data

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

  /**
   * The method of the EventTarget sends an Event to the object, (synchronously) invoking
   * the affected EventListeners in the appropriate order
   *
   * Отправляет событие в общую систему событий. Это событие подчиняется тем же правилам
   * поведения "Захвата" и "Всплывания" как и непосредственно инициированные события
   * @param detail an event-dependent value associated with the event / зависимое от события
   * значение, связанное с событием
   */
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

  static stopPropagation (event: Event): void {
    event.preventDefault()
    event.stopPropagation()
  }

  static clientX (event: MouseEvent & TouchEvent): number {
    return event?.clientX || event?.targetTouches?.[0].clientX || event?.touches?.[0].clientX || 0
  }

  static clientY (event: MouseEvent & TouchEvent): number {
    return event?.clientY || event?.targetTouches?.[0].clientY || event?.touches?.[0].clientY || 0
  }
}
