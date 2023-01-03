import { Ref, ref, watch } from 'vue'
import { StorageAbstract } from './StorageAbstract'
import { forEach } from '../functions'
import { RefAssociativeType } from '../constructors/types'

export type HashType = Ref<string>

export class Hash extends StorageAbstract<string> {
  public static readonly data = {} as RefAssociativeType<string>

  constructor (key: string) {
    if (!(key in Hash.data)) {
      Hash.setData(key, '')
    }

    super(key, Hash.data[key])
  }

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
