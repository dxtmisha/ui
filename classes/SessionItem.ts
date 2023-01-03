import { StorageItemAbstract } from './StorageItemAbstract'

export class SessionItem<T = any> extends StorageItemAbstract<T> {
  constructor (key: string) {
    super(key, 'session', sessionStorage)
  }
}
