'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.EventItem = void 0
const vue_1 = require('vue')
/**
 * Class for working with events
 *
 * Класс для работа с события
 */
class EventItem {
  /**
     * A case-sensitive string representing the event type to listen for
     *
     * Чувствительная к регистру строка, представляющая тип обрабатываемого события
     * @protected
     */
  type = (0, vue_1.ref)(['click'])
  /**
     * Element
     *
     * Элемент
     * @protected
     */
  element
  /**
     * The object that receives a notification (an object that implements the Event interface)
     * when an event of the specified type occurs
     *
     * Объект, который принимает уведомление, когда событие указанного типа произошло.
     * Это должен быть объект, реализующий интерфейс EventListener или просто функция JavaScript
     * @protected
     */
  callback
  /**
     * Element for checking. If the element is missing in the DOM, the event is turned off
     *
     * Элемент для проверки. Если элемент отсутствует в DOM, событие выключается
     * @protected
     */
  dom
  /**
     * A boolean value indicating that the listener should be invoked at most once after
     * being added. If true, the listener would be automatically removed when invoked
     *
     * Указывает, что обработчик должен быть вызван не более одного раза после добавления.
     * Если true, обработчик автоматически удаляется при вызове
     * @protected
     */
  once
  /**
     * An object that, in addition of the properties defined in Event()
     *
     * Объект, который помимо свойств, определенных в Event()
     * @protected
     */
  options
  /**
     * Event states
     *
     * Состояния события
     * @protected
     */
  activity = false
  /**
     * The object that receives a notification (an object that implements the Event interface)
     * when an event of the specified type occurs. This must be null, an object with a
     * handleEvent() method, or a JavaScript function
     *
     * Объект, который принимает уведомление, когда событие указанного типа произошло.
     * Это должен быть объект, реализующий интерфейс EventListener или просто функция JavaScript
     * @protected
     */
  elementCallback
  /**
     * Classes Constructor
     *
     * Конструктор
     * @param element element / элемент
     * @param callback the object that receives a notification (an object that implements the
     * Event interface) when an event of the specified type occurs / Объект, который принимает
     * уведомление, когда событие указанного типа произошло
     */
  constructor (element, callback = () => undefined) {
    this.element = (0, vue_1.isRef)(element) ? element : (0, vue_1.ref)(this.findElement(element))
    this.callback = callback
    this.elementCallback = (event) => this.listener(event);
    (0, vue_1.watch)([this.type, this.element], ([newType, newElement], [oldType, oldElement]) => {
      if (this.activity &&
                newElement !== oldElement) {
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
  elementDom = (0, vue_1.computed)(() => {
    return this.getDom() || (this.element.value === window ? document.body : this.element.value)
  })

  /**
     * Changes the object that receives the notification
     *
     * Изменяеть объект, который принимает уведомление
     * @param value
     */
  setCallback (value) {
    this.callback = value
    return this
  }

  /**
     * Returns an element for control
     *
     * Возвращает элемент для контроля
     */
  getDom () {
    if (this.dom) {
      const element = this.findElement((0, vue_1.isRef)(this.dom) ? this.dom.value : this.dom)
      return (element === window ? document.body : element)
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
  setDom (value) {
    this.dom = value
    return this
  }

  /**
     * Changes the options object, which defines the characteristics of the object
     *
     * Изменяеть объект options, который определяет характеристики объекта
     * @param value object that specifies characteristics / объект options
     */
  setOptions (value) {
    this.options = value
    return this
  }

  /**
     * Changes the type of the processed event
     *
     * Изменяеть тип обрабатываемого события
     * @param value type / тип
     */
  setType (value) {
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
  listener (event) {
    let data
    if (this.elementDom.value instanceof HTMLElement &&
            this.elementDom.value.closest('html')) {
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

  go () {
    if (!this.activity) {
      this.activity = true
      this.type.value.forEach(type => this.addEvent(type))
    }
    return this
  }

  goOnce () {
    this.once = true
    this.go()
    return this
  }

  stop () {
    if (this.activity) {
      this.activity = false
      this.type.value.forEach(type => this.removeEvent(type))
    }
    return this
  }

  toggle (go) {
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
  dispatch (detail) {
    this.type.value.forEach(type => this.element.value.dispatchEvent(new CustomEvent(type, { detail })))
    return this
  }

  addEvent (type, element) {
    (element || this.element.value).addEventListener(type, this.elementCallback)
    return this
  }

  removeEvent (type, element) {
    (element || this.element.value).removeEventListener(type, this.elementCallback)
    return this
  }

  findElement (element) {
    return (typeof element === 'string' ? document.querySelector(element) : element) || document.body
  }

  static stopPropagation (event) {
    event.preventDefault()
    event.stopPropagation()
  }

  static clientX (event) {
    return event?.clientX || event?.targetTouches?.[0].clientX || event?.touches?.[0].clientX || 0
  }

  static clientY (event) {
    return event?.clientY || event?.targetTouches?.[0].clientY || event?.touches?.[0].clientY || 0
  }
}
exports.EventItem = EventItem
// # sourceMappingURL=EventItem.js.map
