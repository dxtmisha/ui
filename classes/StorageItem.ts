import { StorageItemAbstract } from './StorageItemAbstract'

export class StorageItem<T = any> extends StorageItemAbstract<T> {
  constructor (key: string) {
    super(key, 'local', localStorage)
  }
}
