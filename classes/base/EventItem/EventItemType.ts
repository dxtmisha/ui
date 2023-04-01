import { To } from '../../To'

/**
 * Class for working with the type of processed event
 *
 * Класс для работы с типом обрабатываемого события
 */
export class EventItemType {
  /**
   * A case-sensitive string representing the event type to listen for
   *
   * Чувствительная к регистру строка, представляющая тип обрабатываемого события
   * @protected
   */
  item = ['click'] as string[]

  /**
   * Returns the type of processed event
   *
   * Возвращает тип обрабатываемого события
   */
  get (): string[] {
    return this.item
  }

  /**
   * Changes the type of event processing
   *
   * Изменяет тип обработки события
   * @param type type / тип
   */
  set (type: string | string[]): this {
    this.item = To.array(type)
    return this
  }
}
