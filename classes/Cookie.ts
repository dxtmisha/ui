import { ref, Ref, watch } from 'vue'
import { StorageAbstract } from './StorageAbstract'
import { isFilled } from '../functions/data'

export type CookieSameSiteType = 'strict' | 'lax'

export interface CookieItemType {
  key: string
  item: Ref<string | undefined>
  age: number
  sameSite: CookieSameSiteType
  argument: Array<string>
}

export type CookieItemsType = {
  [key: string]: CookieItemType
}

/**
 * Class for working with cookies
 *
 * Класс для управления Cookie
 */
export class Cookie extends StorageAbstract<string> {
  public static readonly data = {} as CookieItemsType

  protected readonly item: CookieItemType

  constructor (key: string) {
    if (!(key in Cookie.data)) {
      Cookie.setData(key)
    }

    super(key, Cookie.data[key].item)
    this.item = Cookie.data[key]
  }

  /**
   * Send a cookie
   *
   * Отправляет cookie
   * @param value The value of the cookie / Значение cookie
   * @param age The time the cookie expires / Время, когда срок действия
   * cookie истекает
   * @param sameSite The value of the sameSite element should be either None,
   * Lax or Strict / Значение элемента sameSite должно быть либо None, либо Lax,
   * либо Strict
   * @param argument An associative array which may have any of the keys expires,
   * path, domain, secure, httponly and sameSite / Ассоциативный массив (array), который
   * может иметь любой из ключей: expires, path, domain, secure, httponly и sameSite
   */
  set (
    value: string,
    age?: number,
    sameSite?: CookieSameSiteType,
    argument?: Array<string>
  ): this {
    this.setAge(age)
      .setSameSite(sameSite)
      .setArgument(argument)

    this.item.item.value = value.toString().trim()

    return this
  }

  /**
   * The time the cookie expires
   *
   * Время, когда срок действия cookie истекает
   * @param value
   * @private
   */
  private setAge (value?: number): this {
    if (value !== undefined) {
      this.item.age = value
    }

    return this
  }

  /**
   * Prevents the browser from sending this cookie along with cross-site requests.
   * Possible values for the flag are lax or strict.
   *
   * Не позволяет браузеру отправлять этот файл cookie вместе с межсайтовыми запросами.
   * Возможные значения флага: lax или strict.
   * @param value
   * @private
   */
  private setSameSite (value?: CookieSameSiteType): this {
    if (value !== undefined) {
      this.item.sameSite = value
    }

    return this
  }

  /**
   * Changes of properties of the writing cookie
   *
   * Изменения свойств записывающего cookie
   * @param value
   * @private
   */
  private setArgument (value?: Array<string>): this {
    if (value !== undefined) {
      this.item.argument = value
    }

    return this
  }

  remove (): this {
    this.item.item.value = ''

    return this
  }

  /**
   * Write a new cookie
   *
   * Запись новой cookie
   * @param key
   * @param value
   * @private
   */
  private static setData (key: string, value?: string): void {
    if (key in this.data) {
      this.data[key].item.value = value
    } else {
      const item = ref(value)

      this.data[key] = {
        key,
        item,
        age: 24 * 60 * 60,
        sameSite: 'strict',
        argument: []
      }

      watch(item, () => {
        const data = this.data[key]
        const age = isFilled(data.item.value) ? data.age : -1

        document.cookie = [
          `${encodeURIComponent(data.key)}=${encodeURIComponent(data.item.value || '')}`,
          `max-age=${age}`,
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
