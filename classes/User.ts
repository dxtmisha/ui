import { ComputedRef } from 'vue'
import { Cookie } from './Cookie'
import { StorageItem } from './StorageItem'
import { random } from '../functions'
import { UserType } from '../constructors/types'

export class User {
  protected static limit = 5 as number

  protected static item: StorageItem<UserType>
  protected static list: StorageItem<UserType[]>
  protected static refresh: Cookie
  protected static signature: StorageItem<string>
  protected static token: StorageItem<string>

  static get (): ComputedRef<UserType | undefined> {
    return this.item.get()
  }

  static set (value: UserType): void {
    const list = this.list.get().value?.filter(item => item.id !== value.id) || []

    this.list.set([...list, value].splice(this.limit))
    this.item.set(value)
  }

  static getRefresh (): ComputedRef<string> {
    return this.refresh.get('')
  }

  static getSignature (): ComputedRef<string> {
    return this.signature.get(() => `${new Date().getMilliseconds()}-${random(100000, 900000)}`)
  }

  static getToken (): ComputedRef<string> {
    return this.token.get('')
  }

  static setToken (value: string): void {
    this.token.set(value)
  }

  static setRefresh (value: string): void {
    this.refresh.set(value, 30 * 24 * 60 * 60)
  }

  static {
    this.item = new StorageItem('user')
    this.list = new StorageItem('user-list')
    this.token = new StorageItem('user-token')
    this.signature = new StorageItem('user-signature')
    this.refresh = new Cookie('user-refresh')
  }
}
