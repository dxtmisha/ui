import { ref } from 'vue'
import { WindowClassesControlType, WindowStatusType } from './types'

/**
 * List of available statuses
 *
 * Список доступных статусов
 */
const CLASSES = {
  block: 'block',
  close: 'close',
  static: 'static',
  controlStatic: 'control-static'
} as WindowClassesControlType

/**
 * A class that changes the status of the current component. This is needed for
 * working with animation and behavior of the element when opening/closing
 *
 * Класс, отвечающий за изменение статуса текущего компонента. Это нужно для работы
 * с анимацией и поведением элемента при открытии/закрытии
 */
export class WindowStatus {
  /**
   * Name of the component
   *
   * Название компонента
   * @protected
   */
  protected readonly NAME = 'window' as string

  /**
   * The value of the current status
   *
   * Значение текущего статуса
   */
  readonly item = ref<WindowStatusType>('close')

  /**
   * Is the current status hidden (hide)
   *
   * Является ли текущий статус закрытым (hide)
   */
  isHide (): boolean {
    return this.item.value === 'hide'
  }

  /**
   * Returns the current status
   *
   * Возвращает текущий статус
   */
  get (): WindowStatusType {
    return this.item.value
  }

  /**
   * Returns the class name by the name of the element type
   *
   * Возвращает имя класса по названию типа элемента
   * @param name type / тип
   */
  getClassByName (name: keyof WindowClassesControlType): string {
    return name in CLASSES ? `.${this.NAME}-${CLASSES[name]}` : ''
  }

  /**
   * Change the current status
   *
   * Изменить текущий статус
   * @param value value / значение
   */
  set (value: WindowStatusType): this {
    this.item.value = value

    return this
  }
}
