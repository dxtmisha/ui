import { ElementType } from '../../../constructors/types'

/**
 * For working with elements
 *
 * Для работа с элементами
 */
export class EventItemElement {
  /**
   * Element
   *
   * Элемент
   * @private
   */
  private item: ElementType

  constructor (
    element?: ElementType | string
  ) {
    this.item = this.findElement(element)
  }

  /**
   * Returns the element
   *
   * Возвращает элемент
   */
  get (): ElementType {
    return this.item
  }

  /**
   * Changes the element
   *
   * Изменяет элемент
   * @param element a string containing one or more selectors to match / содержащий
   * один или более селекторов для сопоставления
   */
  set (element?: ElementType | string): this {
    this.item = this.findElement(element)
    return this
  }

  /**
   * Returns the document element that matches the specified selector or the
   * element itself if passed as an element
   *
   * Возвращает элемент документа, который соответствует указанному селектору
   * или самим элементом, если передано как элемент
   * @param element a string containing one or more selectors to match / содержащий
   * один или более селекторов для сопоставления
   * @private
   */
  private findElement (element?: ElementType | string): ElementType {
    return (typeof element === 'string' ? document.querySelector(element) : element) || document.body
  }
}
