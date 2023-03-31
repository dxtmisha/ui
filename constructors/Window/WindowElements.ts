import { ComponentItem } from '../../classes/ComponentItem'
import { getIdElement } from '../../functions'

import { WindowStatus } from './WindowStatus'

import { WindowClassesControlType } from './types'

/**
 * Class for working with window elements
 *
 * Класс для работы с элементами окна
 */
export class WindowElements {
  /**
   * Identification of the current window. Used to search for the current component and its control
   *
   * Идентификация текущего окна. Используется для поиска текущего компонента и его контроля
   * @protected
   */
  protected readonly id = `window--id--${getIdElement()}`

  /**
   * Class name for the control. The control element is an element that changes
   * the state of the window, opens or closes it
   *
   * Название класса для элемента управления. Элемент управления - это элемент, по которому
   * изменяется состояние окна, открывается или закрывается оно
   * @protected
   */
  protected readonly classControl: string

  /**
   * The class name for the body of the window. This is an element with the context of the window
   *
   * Название класса для тела окна. Это элемент с контекстом окна
   * @protected
   */
  protected readonly classBody: string

  constructor (
    protected readonly item: ComponentItem,
    protected readonly status: WindowStatus
  ) {
    this.classControl = item.getClassName(['control'])
    this.classBody = item.getClassName(['body'])
  }

  /**
   * Get the full class name
   *
   * Получить полное название класса
   */
  getName (): string {
    return this.item.getBasicClassName()
  }

  /**
   * Get the identification of the current window
   *
   * Получить идентификатор текущего окна
   */
  getId (): string {
    return this.id
  }

  /**
   * Get the object with classes
   *
   * Получить объект с классами
   */
  getClass (): object {
    return { [this.id]: true }
  }

  /**
   * Get the class name for the control element
   *
   * Получить название класса для элемента управления
   */
  getClassControl (): string {
    return this.classControl
  }

  /**
   * Get the class name for the window body
   *
   * Получить название класса для тела окна
   */
  getClassBody (): string {
    return this.classBody
  }

  /**
   * Search and return the control element of the current component
   *
   * Поиск и возвращение элемента управления текущего компонента
   */
  getControl (): HTMLElement | undefined {
    return document.querySelector<HTMLElement>(`.${this.classControl}.${this.id}`) || undefined
  }

  /**
   * Get the dimensions of the control element
   *
   * Получить размеры элемента управления
   */
  getRect (): DOMRect | undefined {
    return this.getControl()?.getBoundingClientRect() || undefined
  }

  /**
   * Search and return the element of the window body for the current component
   *
   * Поиск и возвращение элемента тела окна для текущего компонента
   */
  getBody (): HTMLDivElement | undefined {
    return document.querySelector<HTMLDivElement>(`.${this.getName()}.${this.id} .${this.classBody}`) || undefined
  }

  /**
   * Returns the selector with the identifier by the name of the status
   *
   * Возвращает селектор с идентификатором по названию статуса
   * @param name the name of the status / название статуса
   */
  getByStatus (name: keyof WindowClassesControlType): string {
    return `.${this.getId()} ${this.status.getClassByName(name)}`
  }
}
