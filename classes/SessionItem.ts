import { StorageItemAbstract } from './StorageItemAbstract'

/**
 * Class for working with sessionStorage
 *
 * Класс для работы с sessionStorage
 */
export class SessionItem<T = any> extends StorageItemAbstract<T> {
  constructor (key: string) {
    super(key, 'session', sessionStorage)
  }
}
