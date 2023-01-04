import { computed, ref } from 'vue'
import { StorageItem } from './StorageItem'
import { GeoType } from '../constructors/types'
import geo from '../constructors/geo.json'

export class Geo {
  protected static storage: StorageItem

  public static data = ref<GeoType | undefined>()
  public static readonly lang = computed<string>(() => this.data.value?.language || 'en')
  public static readonly country = computed<string>(() => this.data.value?.country || 'GB')
  public static readonly code = computed<string>(() => this.toCode(this.data.value) || 'en-GB')
  public static readonly firstDay = computed<string>(() => this.data.value?.firstDay || 'Mo')

  static findLocation (): string {
    return this.storage.get().value ||
      document.querySelector('html')?.lang ||
      navigator.language ||
      navigator.languages[0] ||
      process.env?.VUE_APP_LANGUAGE ||
      'en-GB'
  }

  static getBase (): GeoType[] {
    return geo
  }

  static getFullLang (code: string): string {
    return this.toCode(this.getDataByCode(code)) || 'en-GB'
  }

  static getData (code: string): GeoType | undefined {
    return geo?.find(item => `${item?.language}-${item?.country}` === code)
  }

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

  static getDataByCountry (country: string): GeoType | undefined {
    return geo?.find(item => {
      return item?.country === country ||
        item?.countryAlternative?.find(countryAlternative => countryAlternative === country)
    })
  }

  static getDataByLanguage (language: string): GeoType | undefined {
    return geo?.find(item => {
      return item?.language === language ||
        item?.languageAlternative?.find(languageAlternative => languageAlternative === language)
    })
  }

  static set (code: string, save?: boolean): void {
    this.data.value = this.getData(this.getFullLang(code)) as GeoType

    if (save) {
      this.storage.set(code)
    }
  }

  static toCode (data?: GeoType): string | undefined {
    return data ? `${data?.language}-${data?.country}` : undefined
  }

  static {
    this.storage = new StorageItem('geo-code')
    this.data.value = this.getDataByCode(this.findLocation())
  }
}
