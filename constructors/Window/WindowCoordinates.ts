import { Ref } from 'vue'
import { WindowElements } from './WindowElements'
import { WindowCoordinatesType } from './types'

/**
 * The object stores parameters for the control element. The position and size of
 * the menu are calculated based on these data
 *
 * Объект хранит параметры для элемента управления. По этим данным вычисляются
 * положение и размер меню
 */
export class WindowCoordinates {
  /**
   * Data with parameters
   *
   * Данных с параметрами
   * @private
   */
  private readonly item = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: 0,
    height: 0,
    innerWidth: 0,
    innerHeight: 0
  } as WindowCoordinatesType

  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly element: Ref<HTMLDivElement | undefined>,
    private readonly elements: WindowElements
  ) {
  }

  /**
   * Returns parameters
   *
   * Возвращает параметры
   */
  get (): WindowCoordinatesType {
    return this.item
  }

  /**
   * Returns the right margin
   *
   * Возвращает отступ сверху
   */
  getTop (): number {
    return this.item.top
  }

  /**
   * Returns the right margin
   *
   * Возвращает отступ справа
   */
  getRight (): number {
    return this.item.right
  }

  /**
   * Returns the bottom margin
   *
   * Возвращает отступ снизу
   */
  getBottom (): number {
    return this.item.bottom
  }

  /**
   * Returns the left margin
   *
   * Возвращает отступ слева
   */
  getLeft (): number {
    return this.item.left
  }

  /**
   * Returns the width
   *
   * Возвращает ширину
   */
  getWidth (): number {
    return this.item.width
  }

  /**
   * Returns the height
   *
   * Возвращает высоту
   */
  getHeight (): number {
    return this.item.height
  }

  /**
   * Updates the settings
   *
   * Обновляет параметры
   */
  update (): boolean {
    const rect = this.elements.getRect()

    if (
      this.element.value &&
      rect && (
        this.item.top !== rect.top ||
        this.item.right !== rect.right ||
        this.item.bottom !== rect.bottom ||
        this.item.left !== rect.left ||
        this.item.width !== this.element.value.offsetWidth ||
        this.item.height !== this.element.value.offsetHeight ||
        this.item.innerWidth !== window.innerWidth ||
        this.item.innerHeight !== window.innerHeight
      )
    ) {
      this.item.top = rect.top
      this.item.right = rect.right
      this.item.bottom = rect.bottom
      this.item.left = rect.left
      this.item.width = this.element.value.offsetWidth
      this.item.height = this.element.value.offsetHeight
      this.item.innerWidth = window.innerWidth
      this.item.innerHeight = window.innerHeight

      return true
    }

    return false
  }

  /**
   * Resets the settings. Used to enumerate coordinates when opening
   *
   * Сбрасывает параметры. Используется для перечисления координат при открытии
   */
  restart (): this {
    this.item.top = 0
    this.item.right = 0
    this.item.bottom = 0
    this.item.left = 0
    this.item.width = 0
    this.item.height = 0

    return this
  }
}
