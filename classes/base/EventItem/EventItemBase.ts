import { EventItemElement } from './EventItemElement'
import { EventItemType } from './EventItemType'

import { ElementType } from '../../../constructors/types'

/**
 * Class for working with events
 *
 * Класс для работа с события
 */
export class EventItemBase {
  protected readonly type: EventItemType
  protected readonly element: EventItemElement

  constructor (
    element?: ElementType | string
  ) {
    this.type = new EventItemType()
    this.element = new EventItemElement(element)
  }

  /**
   * Changes the type of event processing
   *
   * Изменяет тип обработки события
   * @param type type / тип
   */
  setType (type: string | string[]): this {
    this.type.set(type)
    return this
  }
}
