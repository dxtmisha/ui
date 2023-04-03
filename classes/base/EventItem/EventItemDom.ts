import { EventItemElement } from './EventItemElement'
import { ElementType } from '../../../constructors/types'
import { isRef } from 'vue'

/**
 * Класс для работа с элемент управления
 */
export class EventItemDom {
  /**
   * Element
   *
   * Элемент
   * @private
   */
  private item?: ElementType

  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly element: EventItemElement
  ) {
  }

  /*
  get () {

  }

  /*
  te getDom (): HTMLElement | undefined {
    if (this.dom) {
      const element = this.findElement(isRef(this.dom) ? this.dom.value : this.dom)

      return (element === window ? document.body : element) as HTMLElement
    } else {
      return undefined
    }
  }

   */
}
