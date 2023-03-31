/**
 * The class stores the coordinates of the mouse click. It is used for the opening
 * animation, when the element appears from the point of click. And also for the contextmenu event
 *
 * Класс хранит координаты нажатия мыши. Используется для анимации открытия,
 * когда элемент появляется от точки нажатия. А также для события contextmenu
 */
export class WindowClient {
  private x = 0 as number
  private y = 0 as number

  /**
   * Returns the X coordinate
   *
   * Возвращает координату X
   */
  getX (): number {
    return this.x
  }

  /**
   * Returns the Y coordinate
   *
   * Возвращает координату Y
   */
  getY (): number {
    return this.y
  }

  /**
   * Returns the shift along the X coordinate
   *
   * Возвращает сдвиг по координате X
   */
  getShiftX (value: number): number {
    return this.x - value
  }

  /**
   * Returns the shift along the Y coordinate
   *
   * Возвращает сдвиг по координате Y
   */
  getShiftY (value: number): number {
    return this.y - value
  }

  /**
   * Changes the coordinates
   *
   * Изменяет координаты
   * @param x value of X / значение X
   * @param y value of Y / значение Y
   */
  set (x: number, y: number): this {
    this.x = x
    this.y = y

    return this
  }
}
