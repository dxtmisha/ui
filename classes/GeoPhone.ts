import { computed, ComputedRef, ref } from 'vue'
import { forEach } from '../functions/data'

import { Geo } from './Geo'
import { GeoAbstract } from './GeoAbstract'
import { GeoFlag } from './GeoFlag'

import { AssociativeType, GeoPhoneInfoType, GeoPhoneItemType, GeoPhoneMapType, GeoType } from '../constructors/types'
import { GeoCodeType } from '../constructors/typesRef'

/**
 * Class for working with phone numbers
 *
 * Класс для работы с номерами телефонов
 */
export class GeoPhone extends GeoAbstract {
  public static list: ComputedRef<GeoPhoneInfoType[]>
  public static map: ComputedRef<AssociativeType<GeoPhoneMapType>>

  public readonly item = ref<GeoPhoneMapType | undefined>(undefined)
  public readonly phone = ref<string>('')

  constructor (
    code?: GeoCodeType,
    phone?: string
  ) {
    super(code)

    if (phone) {
      this.set(phone)
    }
  }

  /**
   * Getting an object with information about the phone code and country
   *
   * Получение объекта с информацией о телефонном коде и стране
   */
  getInfo (): ComputedRef<GeoPhoneInfoType | undefined> {
    return computed(() => this.getInfoStatic())
  }

  /**
   * Getting an object with information about the phone code and country
   *
   * Получение объекта с информацией о телефонном коде и стране
   */
  getInfoStatic (): GeoPhoneInfoType | undefined {
    return GeoPhone.list.value.find(item => this.code.value === item.value)
  }

  getMask (): ComputedRef<string[] | undefined> {
    return computed(() => this.getMaskStatic())
  }

  /**
   * Getting a phone mask
   *
   * Получение маски телефона
   */
  getMaskStatic (): string[] | undefined {
    return this.getInfoStatic()?.mask
  }

  /**
   * Changing data by phone number
   *
   * Изменение данных по номеру телефона
   * @param phone phone number / номер телефон
   */
  set (phone: string): this {
    const data = GeoPhone.getItemByPhone(phone)

    if (data.item) {
      this.item.value = data.item
      this.phone.value = data.value
    } else {
      this.item.value = undefined
      this.phone.value = ''
    }

    return this
  }

  /**
   * Convert to phone mask
   *
   * Преобразовать в маску телефона
   */
  toMask (): ComputedRef<string> {
    return computed(() => {
      let data = '' as string

      if (this.phone.value !== '') {
        const length = this.phone.value.length

        if (this.item.value?.mask) {
          for (const mask of this.item.value.mask) {
            if (mask.replace(/[^*]+/ig, '').length === length) {
              let character = 0
              data = mask.replace(/\*/ig, () => this.phone.value[character++])

              break
            }
          }
        }
      }

      return data === '' ? `+${this.data.value?.phone}${this.phone.value}` : data
    })
  }

  /**
   * Getting information by phone
   *
   * Получение информации по телефону
   * @param phone phone number / номер телефон
   */
  static getItemByPhone (phone: string): GeoPhoneItemType {
    let focus = this.map.value as AssociativeType<GeoPhoneMapType>
    let value = undefined as GeoPhoneMapType | undefined
    let valuePhone = ''

    this.toNumber(phone).forEach(number => {
      if (
        valuePhone === '' &&
        number in focus
      ) {
        value = focus[number]
        focus = focus[number].next
      } else {
        valuePhone += number
      }
    })

    return {
      item: value,
      value: valuePhone
    }
  }

  /**
   * Creating a list for the map
   *
   * Формирование списка для карты
   * @protected
   */
  protected static initList (): void {
    this.list = computed(() => {
      const collator = new Intl.Collator(Geo.code.value)
      const data = forEach<GeoType, string, GeoPhoneInfoType | undefined>(
        Geo.getBase(),
        (item) => {
          const flag = new GeoFlag().get(item.country).value

          if (item?.phoneMask && flag) {
            const mask = Array.isArray(item.phoneMask) ? item.phoneMask : [item.phoneMask]

            return {
              icon: flag.icon,
              country: flag.country,
              language: flag.language,
              value: flag.value,
              phone: item.phone ? parseInt(item.phone) : undefined,
              mask
            }
          } else {
            return undefined
          }
        },
        true
      ) as GeoPhoneInfoType[]

      return data.sort((a, b) => collator.compare(a.country, b.country))
    })
  }

  /**
   * Creating a map for search
   *
   * Создание карты для поиска
   * @protected
   */
  protected static initMap (): void {
    this.map = computed(() => {
      const data = {} as AssociativeType<GeoPhoneMapType>

      this.list.value.forEach((item: GeoPhoneInfoType) => {
        item.mask.forEach((mask: string) => {
          let focus = data as AssociativeType<GeoPhoneMapType>
          let value = undefined as GeoPhoneMapType | undefined

          this.toNumber(mask).forEach((number: string) => {
            if (!(number in focus)) {
              focus[number] = {
                code: undefined,
                info: undefined,
                mask: [],
                maskFull: [],
                next: {}
              }
            }

            value = focus[number]
            focus = focus[number].next
          })

          if (value) {
            if (value.code === undefined) {
              value.code = item.value
              value.info = item
            }

            value.mask.push(mask)
            value.maskFull.push(mask.replace(/\d/ig, '*'))
          }
        })
      })

      return data
    })
  }

  /**
   * The method parses a string argument and returns a floating point number
   *
   * Метод принимает строку в качестве аргумента и возвращает десятичное число
   * @param value the value to parse / текстовая строка
   */
  protected static toNumber (value: string): string[] {
    return value
      .replace(/\D+/ig, '')
      .split('')
  }

  static {
    this.initList()
    this.initMap()
  }
}
