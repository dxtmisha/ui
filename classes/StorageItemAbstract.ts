import { ComputedRef, ref, Ref, watch } from 'vue'
import { Env } from './Env'
import { isNull } from '../functions/data'

import { StorageAbstract } from './StorageAbstract'

import { AnyOrUndefinedType, CallbackNullType } from '../constructors/types'

export interface StorageItemType<T = any> {
  key: string
  item: Ref<T>
  date: number
}

export interface StorageType<T = any> {
  [key: string]: StorageItemType<T>
}

/**
 * Abstract class for working with storage
 *
 * Абстрактный класс для работы с хранилищем
 */
export abstract class StorageItemAbstract<T = any> extends StorageAbstract<T> {
  protected static readonly data = {} as StorageType

  protected static readonly prefix = Env.prefix()
  protected static readonly cacheAgeDefault = Env.cache()

  protected readonly item: StorageItemType<T>

  /**
   * Constructor
   * @param key key / ключ
   * @param name group of records, from which we get data / группа записей, по которой
   * получаем данные
   * @param method class, with which we will work / класс, с которым будем работать
   * @protected
   */
  protected constructor (
    key: string,
    name: string,
    method: Storage
  ) {
    const data = StorageItemAbstract.initData(key, name, method)

    super(key, data.item)

    this.item = data
  }

  /**
   * Getting data with respect to the caching timer
   *
   * Получение данных с учетом таймера кэширования
   * @param callback called function / вызываемая функция
   * @param age cache time / время кэширования
   */
  async cache (
    callback?: CallbackNullType<any>,
    age = StorageItemAbstract.cacheAgeDefault as number
  ): Promise<ComputedRef<AnyOrUndefinedType<T>>> {
    if (callback && this.isOld(age)) {
      this.set(await callback())
    }

    return this.get()
  }

  /**
   * Getting data with respect to the caching timer
   *
   * Получение данных с учетом таймера кэширования
   * @param callback called function / вызываемая функция
   * @param age cache time / время кэширования
   */
  async cacheStatic (
    callback?: CallbackNullType<any>,
    age = StorageItemAbstract.cacheAgeDefault as number
  ): Promise<AnyOrUndefinedType<T>> {
    if (callback && this.isOld(age)) {
      this.set(await callback())
    }

    return this.getStatic()
  }

  private isOld (
    age = StorageItemAbstract.cacheAgeDefault as number
  ): boolean {
    return this.item.date + (age * 1000) < new Date().getTime()
  }

  /**
   * Getting saved data
   *
   * Получение сохраненных данных
   * @param key key / ключ
   * @param name group of records, from which we get data / группа записей, по которой
   * получаем данные
   * @param method class, with which we will work / класс, с которым будем работать
   * @private
   */
  private static initData (
    key: string,
    name: string,
    method: Storage
  ): StorageItemType {
    const keyData = `${name}-${key}`

    if (!(keyData in this.data)) {
      const keyStorage = `${this.prefix}-${keyData}`
      const read = method?.getItem(keyStorage)
      const data = {
        key,
        item: ref(undefined),
        date: new Date().getTime()
      } as StorageItemType

      if (read) {
        try {
          const json = JSON.parse(read)
          data.item.value = json.item
          data.date = json.date
        } catch (e) {
        }
      }

      this.data[keyData] = data

      if (method) {
        watch(data.item, value => {
          if (isNull(value)) {
            method?.removeItem(keyStorage)
          } else {
            method?.setItem(keyStorage, JSON.stringify({
              key,
              item: value,
              date: new Date().getTime()
            }))
          }
        })
      }
    }

    return this.data[keyData]
  }
}
