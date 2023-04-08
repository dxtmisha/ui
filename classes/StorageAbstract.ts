import { computed, ComputedRef, isRef, Ref } from 'vue'
import { isNull } from '../functions/data'

import { CallbackNullType } from '../constructors/types'
import { RefOrCallbackType, RefType } from '../constructors/typesRef'

/**
 * Basic abstract class for managing data storage
 *
 * Базовый абстрактный класс для управления хранением данных
 */
export abstract class StorageAbstract<T = any> {
  // eslint-disable-next-line no-useless-constructor
  protected constructor (
    protected readonly key: string,
    protected readonly value: Ref<T | undefined>
  ) {
  }

  get (): ComputedRef<T | undefined>
  get (value: T): ComputedRef<T>
  get (value: RefType<T>): ComputedRef<T>
  get (callback: CallbackNullType<T>): ComputedRef<T>
  /**
   * Data retrieval
   *
   * Получение данных
   * @param valueCallback if a function is passed, it will execute it when the value is
   * absent / если передать функцию, он ее выполнит при отсутствии значения
   */
  get (valueCallback?: T | RefOrCallbackType<T>): ComputedRef<T | undefined> {
    return computed<T | undefined>(() => {
      if (!isNull(this.value.value)) {
        return this.value.value
      } else if (valueCallback instanceof Function) {
        this.set(valueCallback())
        return this.value.value
      } else if (isRef(valueCallback)) {
        return valueCallback.value
      } else {
        return valueCallback
      }
    })
  }

  /**
   * Getting the most reactive variable
   *
   * Получение самой реактивной переменной
   */
  getItem (): Ref<T | undefined> {
    return this.value
  }

  /**
   * Asynchronous execution of a function when the value is absent
   *
   * Асинхронное выполнение функции при отсутствии значения
   * @param callback executed function / выполняемая функция
   */
  async getAsync (callback: CallbackNullType<T>): Promise<Ref<T | undefined>> {
    if (isNull(this.value.value)) {
      this.set(await callback())
    }

    return this.value
  }

  /**
   * Change the data
   *
   * Изменить данные
   * @param value value / значение
   */
  set (value: T): this {
    this.value.value = value
    return this
  }

  /**
   * Deletion of the value
   *
   * Удаление значения
   */
  remove (): this {
    this.value.value = undefined
    return this
  }
}
