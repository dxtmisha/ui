/**
 * Class for working with Env variables from Vue
 *
 * Класс для работы с Env переменными от Vue
 */
export class Env {
  /**
   * Get values by key without the prefix VUE_APP_
   *
   * Получить значения по ключу без приставки VUE_APP_
   * @param key key / ключ
   * @param value returns value when the value is absent / возвращает value при
   * отсутствии значения
   */
  static get (key: string, value?: string): string {
    return process.env?.[`VUE_APP_${key}`] || value || ''
  }

  /**
   * Get values as a number
   *
   * Получить значения в виде числа
   * @param key key / ключ
   * @param value returns value when the value is absent / возвращает value при
   * отсутствии значения
   */
  static toNumber (key: string, value = 0 as number): number {
    return parseFloat(this.get(key, value.toString())) || 0
  }

  /**
   * Returns CACHE
   *
   * Возвращает CACHE
   */
  static cache (): number {
    return this.toNumber('CACHE', 7 * 24 * 60 * 60)
  }

  /**
   * Returns PREFIX
   *
   * Возвращает PREFIX
   */
  static prefix (): string {
    return this.get('PREFIX', '_d_')
  }
}
