import { ComputedRef } from 'vue'
import { Cookie } from './Cookie'
import { StorageItem } from './StorageItem'
import { random } from '../functions'
import { UserType } from '../constructors/types'

export class User {
  protected static limit = 5 as number

  protected static item: StorageItem<UserType>
  protected static _userList: StorageItem<UserType[]>
  protected static _token: StorageItem<string>
  protected static _signature: StorageItem<string>
  protected static _refresh: Cookie

  static get user (): ComputedRef<UserType | undefined> {
    return this.item.get()
  }

  static get userList (): ComputedRef<UserType[] | undefined> {
    return this._userList.get()
  }

  static setUser (value: UserType): void {
    const list = this.userList.value || []
    const index = list.findIndex(item => item.id === value.id)

    if (index >= 0) {
      list[index] = value
    } else {
      list.push(value)

      if (list.length > this.limit) {
        list.shift()
      }
    }

    this.item.set(value)
    this._userList.set(list)
  }

  static get token (): ComputedRef<string> {
    return this._token.get('')
  }

  static setToken (value: string): void {
    this._token.set(value)
  }

  static get signature (): ComputedRef<string> {
    return this._signature.get(() => `${new Date().getMilliseconds()}-${random(100000, 900000)}`)
  }

  static get refresh (): ComputedRef<string> {
    return this._refresh.get('')
  }

  static setRefresh (value: string): void {
    this._refresh.set(value, 30 * 24 * 60 * 60)
  }

  static {
    this.item = new StorageItem('user')
    this._userList = new StorageItem('user-list')
    this._token = new StorageItem('user-token')
    this._signature = new StorageItem('user-signature')
    this._refresh = new Cookie('user-refresh')
  }
}
