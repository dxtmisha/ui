import { ComputedRef, ref, Ref, watch } from 'vue'
import { Env } from './Env'
import { StorageAbstract } from './StorageAbstract'
import { CallbackNullType } from '../constructors/types'

export type StorageItemType<T = any> = {
  key: string
  item: Ref<T>
  date: number
}

export type StorageItemsType<T = any> = {
  [key: string]: StorageItemType<T>
}

export abstract class StorageItemAbstract<T = any> extends StorageAbstract<T> {
  protected static readonly data = {} as StorageItemsType
  protected static readonly cacheAgeDefault = Env.toNumber('STORAGE_CACHE', 7 * 24 * 60 * 60)
  protected static readonly prefix = Env.prefix()

  protected readonly item: StorageItemType<T>

  protected constructor (
    key: string,
    name: string,
    method: Storage
  ) {
    const data = StorageItemAbstract.initData(key, name, method)

    super(key, data.item)

    this.item = data
  }

  async cache (
    callback?: CallbackNullType<any>,
    age = StorageItemAbstract.cacheAgeDefault as number
  ): Promise<ComputedRef> {
    if (
      callback &&
      this.item.date + age < new Date().getTime()
    ) {
      this.set(await callback())
    }

    return this.get()
  }

  private static initData (
    key: string,
    name: string,
    method: Storage
  ): StorageItemType {
    const keyData = `${name}-${key}`

    if (!(keyData in this.data)) {
      const keyStorage = `${this.prefix}${key}`
      const read = method.getItem(keyStorage)
      const data = {
        key,
        item: ref(undefined),
        date: new Date().getTime()
      }

      if (read) {
        try {
          const json = JSON.parse(read)
          data.item.value = json.item
          data.date = json.date
        } catch (e) {
        }
      }

      this.data[keyData] = data

      watch(data.item, value => {
        if (value !== '') {
          method.setItem(keyStorage, JSON.stringify({
            key,
            item: value,
            date: new Date().getTime()
          }))
        } else {
          method.removeItem(keyStorage)
        }
      })
    }

    return this.data[keyData]
  }
}
