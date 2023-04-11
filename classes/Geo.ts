import { computed, ref } from 'vue'
import { StorageItem } from './StorageItem'

import geo from '../constructors/geo.json'

import { GeoType } from '../constructors/types'

/**
 * Base class for working with geographic data
 *
 * Базовый класс для работы с географическими данными
 */
export class Geo {
  protected static storage: StorageItem

  /**
   * Information about the current country
   *
   * Информация об текущей стране
   */
  public static readonly data = ref<GeoType | undefined>()

  /**
   * Current language
   *
   * Текущий язык
   */
  public static readonly lang = computed<string>(
    () => this.findLanguage() || this.data.value?.language || 'en'
  )

  /**
   * Current country
   *
   * Текущая страна
   */
  public static readonly country = computed<string>(
    () => this.findCountry() || this.data.value?.country || 'GB'
  )

  /**
   * Full format
   *
   * Полный формат
   */
  public static readonly code = computed<string>(
    () => `${this.lang.value}-${this.country.value}`
  )

  /**
   * First day of the week
   *
   * Первый день недели
   */
  public static readonly firstDay = computed<string>(() => this.data.value?.firstDay || 'Mo')

  /**
   * Determines the current location
   *
   * Определяет текущую локацию
   */
  static findLocation (): string {
    return this.storage.get().value ||
      document.querySelector('html')?.lang ||
      navigator.language ||
      navigator.languages[0] ||
      process.env?.VUE_APP_LANGUAGE ||
      'en-GB'
  }

  /**
   * Determines the current language
   *
   * Определяет текущий язык
   */
  static findLanguage (): string {
    return this.toLanguage(this.findLocation())
  }

  /**
   * Determines the current country
   *
   * Определяет текущую страну
   */
  static findCountry (): string {
    return this.toCountry(this.findLocation())
  }

  /**
   * Returns the full list of countries
   *
   * Возвращает полный список стран
   */
  static getBase (): GeoType[] {
    return geo
  }

  /**
   * Returns the full data by language and country
   *
   * Возвращает полные данные по языку и стране
   * @param code string in the form of language-country / строка в виде язык-страна
   */
  static getData (code: string): GeoType | undefined {
    return geo?.find(item => `${item?.language}-${item?.country}` === code)
  }

  /**
   * Returns the full data by language
   *
   * Возвращает полные данные по языку
   * @param language language / язык
   */
  static getDataByLanguage (language: string): GeoType | undefined {
    return geo?.find(item => {
      return item?.language === language ||
        item?.languageAlternative?.find(languageAlternative => languageAlternative === language)
    })
  }

  /**
   * Returns the full data by country
   *
   * Возвращает полные данные по стране
   * @param country country / страна
   */
  static getDataByCountry (country: string): GeoType | undefined {
    return geo?.find(item => {
      return item?.country === country ||
        item?.countryAlternative?.find(countryAlternative => countryAlternative === country)
    })
  }

  /**
   * Returns the data about the country by its full code
   *
   * Возвращает данные о стране по ее полному коду
   * @param code country code, full form language-country or one of them / код
   * страны, полный вид язык-страна или один из них
   */
  static getDataByCode (code?: string): GeoType | undefined {
    let data: GeoType | undefined

    if (code) {
      if (code.match(/-/)) {
        data = this.getData(code)
      } else if (code.match(/^[a-z]{2}$/)) {
        data = this.getDataByLanguage(code)
      } else if (code.match(/^[A-Z]{2}$/)) {
        data = this.getDataByCountry(code)
      }
    }

    return data
  }

  /**
   * Returns the language code by its full language-country
   *
   * Возвращает код языка по его полному язык-страна
   * @param code country code / код страна
   */
  static toLanguage (code: string): string {
    return code.replace(/[^a-z]+/g, '')
  }

  /**
   * Returns the country code by its full language-country
   *
   * Возвращает код страны по ее полному язык-страна
   * @param code country code / код страна
   */
  static toCountry (code: string): string {
    return code.replace(/[^A-Z]+/g, '')
  }

  /**
   * We get the full code by the data of the country
   *
   * Получаем полный код по данным страны
   * @param data data / данный
   */
  static toCode (data?: GeoType): string | undefined {
    return data ? `${data?.language}-${data?.country}` : undefined
  }

  /**
   * Changes the data by the full code
   *
   * Изменяет данные по полному коду
   * @param code country code, full form language-country or one of them / код
   * страны, полный вид язык-страна или один из них
   * @param save save the result / сохранить результат
   */
  static set (code: string, save?: boolean): void {
    const data = this.getDataByCode(code) || this.getDataByCountry(this.toCountry(code))

    this.data.value = {
      ...(data || this.getDataByCountry(this.findCountry()))
    } as GeoType

    if (data && save) {
      this.storage.set(code)
    }
  }

  /**
   * Changes language
   *
   * Изменяет язык
   * @param language language / язык
   * @param save save the result / сохранить результат
   */
  static setLanguage (language: string, save?: boolean) {
    console.log('this.country.value', this.country.value)
    this.set(`${language}-${this.country.value}`, save)
  }

  /**
   * Changes the country
   *
   * Изменяет страну
   * @param country language / язык
   * @param save save the result / сохранить результат
   */
  static setCountry (country: string, save?: boolean) {
    this.set(`${this.lang.value}-${country}`, save)
  }

  static {
    this.storage = new StorageItem('geo-code')
    this.set(this.findLocation())
  }
}
