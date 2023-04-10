import { Ref, ref, watch } from 'vue'
import { forEach } from '../functions/data'

import { StorageAbstract } from './StorageAbstract'

import { RefAssociativeType } from '../constructors/typesRef'

export type HashType = Ref<string>

/**
 * Working with data stored in hash
 *
 * Работа с данными сохраненными в хеш
 */
export class Hash extends StorageAbstract<string> {
  public static readonly data = {} as RefAssociativeType<string>

  constructor (key: string) {
    if (!(key in Hash.data)) {
      Hash.setData(key, '')
    }

    super(key, Hash.data[key])
  }

  /**
   * Adding a new record
   *
   * Добавление новой записи
   * @param key key value / ключ значения
   * @param value value / значения
   */
  static setData (key: string, value: string): void {
    if (key in this.data) {
      this.data[key].value = value
    } else {
      const item = ref(value)

      this.data[key] = item
      watch(item, () => this.collect())
    }
  }

  protected static collect () {
    const hash = forEach<HashType, string, string>(this.data,
      (item, key) => item.value !== '' ? `${key}=${encodeURIComponent(item.value)}` : ''
    )

    if (hash) {
      hash.sort()
      history.replaceState(null, '', `#${hash.join(';')}`)
    }
  }

  static {
    location.hash.replace(
      /([A-z-]+)[:=]([^;]+)/ig,
      (
        all: string,
        key: string,
        value: string
      ) => {
        this.setData(key, value)
        return ''
      }
    )
  }
}
