import { ref, Ref, watch } from 'vue'
import { StorageAbstract } from './StorageAbstract'

export type CookieItemType = {
  key: string
  item: Ref<string>
  age: number
  sameSite: string
  argument: Array<string>
}

export type CookieItemsType = {
  [key: string]: CookieItemType
}

export class Cookie extends StorageAbstract<string> {
  public static readonly data = {} as CookieItemsType

  protected readonly item: CookieItemType

  constructor (key: string) {
    if (!(key in Cookie.data)) {
      Cookie.setData(key, '')
    }

    super(key, Cookie.data[key].item)
    this.item = Cookie.data[key]
  }

  set (
    value: string,
    age?: number,
    sameSite?: string,
    argument?: Array<string>
  ): this {
    this.setAge(age)
      .setSameSite(sameSite)
      .setArgument(argument)

    this.item.item.value = value.toString().trim()

    return this
  }

  private setAge (value?: number): this {
    if (value !== undefined) {
      this.item.age = value
    }

    return this
  }

  private setSameSite (value?: string): this {
    if (value !== undefined) {
      this.item.sameSite = value
    }

    return this
  }

  private setArgument (value?: Array<string>): this {
    if (value !== undefined) {
      this.item.argument = value
    }

    return this
  }

  remove (): this {
    this.setAge(-1)
    this.item.item.value = ''

    return this
  }

  private static setData (key: string, value: string): void {
    if (key in this.data) {
      this.data[key].item.value = value
    } else {
      const item = ref(value)

      this.data[key] = {
        key,
        item,
        age: 24 * 60 * 60,
        sameSite: 'Strict',
        argument: []
      }

      watch(item, () => {
        const data = this.data[key]
        document.cookie = [
          `${encodeURIComponent(data.key)}=${encodeURIComponent(data.item.value)}`,
          `max-age=${data.age}`,
          `SameSite=${data.sameSite}`,
          ...data.argument
        ].join('; ')
      })
    }
  }

  static {
    for (const item of document.cookie.split(';')) {
      const [key, value] = item.trim().split('=') as Array<string>

      if (key) {
        this.setData(key, value)
      }
    }
  }
}
