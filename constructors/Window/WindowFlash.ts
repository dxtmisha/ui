import { Ref } from 'vue'
import { WindowElements } from './WindowElements'

/**
 * The class for working with the flash parameter. The flash property is
 * responsible for disabling the animation when opening the window. Also,
 * the animation is disabled when there are already open windows
 *
 * Класс для работы с параметром flash. Свойство flash отвечает за отключение
 * анимации при открытии окна. А также отключается анимация, когда уже есть
 * открытые окна
 */
export class WindowFlash {
  /**
   * An auxiliary parameter for closing the window if the control element
   * is on another window
   *
   * Вспомогательный параметр для закрытия окна, если элемент управления на другом окне
   * @protected
   */
  protected control = false as boolean

  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly elements: WindowElements,
    protected readonly flash?: Ref<boolean>
  ) {
  }

  /**
   * Is the flash property active
   *
   * Активно ли свойство flash
   */
  is (): boolean {
    return !!this.flash?.value
  }

  /**
   * Checks whether the animation needs to be disabled
   *
   * Проверяет, надо ли отключить анимацию
   */
  isOpen (): boolean {
    return this.is() || this.control
  }

  /**
   * Checks whether the animation needs to be disabled when closing
   *
   * Проверяет, надо ли отключить анимацию при закрытии
   */
  isHide (): boolean {
    return this.is() ||
      !!document.querySelector(`.${this.elements.getName()}[data-status="hide"]`) ||
      !!document.querySelector(`.${this.elements.getName()}[data-status="close"]`)
  }

  /**
   * Change the value of the control parameter
   *
   * Изменить значение параметра control
   * @param target the element that gets focus on click / элемент, который получает фокус при клике
   */
  setControl (target?: HTMLElement): void {
    this.control = target?.closest<HTMLElement>(`.${this.elements.getClassControl()}`)?.dataset.window === this.elements.getId()
  }
}
