import { computed, ComputedRef } from 'vue'
import { Geo } from './Geo'
import { isFilled } from '../functions/data'
import { getRef } from '../functions/ref'

import { GeoType } from '../constructors/types'
import { GeoCodeType } from '../constructors/typesRef'

/**
 * Abstract class for working with location
 *
 * Абстрактный класс для работы с локацией
 */
export abstract class GeoAbstract {
  public readonly item: ComputedRef<string>
  public readonly data: ComputedRef<GeoType | undefined>

  /**
   * Current language
   *
   * Текущий язык
   */
  public readonly lang = computed<string>(
    () => Geo.toLanguage(this.item.value) || this.data.value?.language || 'en'
  )

  /**
   * Current country
   *
   * Текущая страна
   */
  public readonly country = computed<string>(
    () => Geo.toCountry(this.item.value) || this.data.value?.country || 'GB'
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
    this.item = computed<string>(() => getRef(code) || '')
    this.data = computed(() => {
      let data: GeoType | undefined

      if (isFilled(this.item)) {
        data = Geo.getDataByCode(this.item.value)
      }

      return data || Geo.data.value
    })
  }
}
