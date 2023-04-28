import { StorageItemAbstract } from './StorageItemAbstract'

/**
 * Class for working with localStorage
 *
 * Класс для работы с localStorage
 */
export class StorageItem<T = any> extends StorageItemAbstract<T> {
  constructor (key: string) {
    super(key, 'local', window?.localStorage)
  }
}
