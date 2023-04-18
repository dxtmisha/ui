import { computed, ComputedRef } from 'vue'
import { isFilled } from '../functions/data'
import { getRef } from '../functions/ref'

import { Geo } from './Geo'
import { GeoType } from '../constructors/types'
import { GeoCodeType } from '../constructors/typesRef'

/**
 * Abstract class for working with location
 *
 * Абстрактный класс для работы с локацией
 */
export abstract class GeoAbstract {
  public readonly data: ComputedRef<GeoType | undefined>

  /**
   * Current language
   *
   * Текущий язык
   */
  public readonly lang = computed<string>(
    () => this.data.value?.language || 'en'
  )

  /**
   * Current country
   *
   * Текущая страна
   */
  public readonly country = computed<string>(
    () => this.data.value?.country || 'GB'
  )

  /**
   * Full format
   *
   * Полный формат
   */
  public readonly code = computed<string>(
    () => `${this.lang.value}-${this.country.value}`
  )

  /**
   * First day of the week
   *
   * Первый день недели
   */
  public readonly firstDay = computed<string>(() => this.data.value?.firstDay || 'Mo')

  /**
   * Constructor
   * @param code string in the form of language-country / строка в виде язык-страна
   */
  constructor (
    code?: GeoCodeType
  ) {
    const value = getRef(code) || Geo.code.value || 'en-GB'

    this.data = computed(() => {
      const data = Geo.findData(value) || Geo.data.value
      const language = Geo.toLanguage(value)

      if (data) {
        return {
          ...data,
          language: isFilled(language) ? language : data?.language
        }
      } else {
        return undefined
      }
    })
  }
}
