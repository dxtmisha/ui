import { computed, ComputedRef, isRef } from 'vue'
import { Geo } from './Geo'
import { GeoCodeType, GeoType } from '../constructors/types'

export abstract class GeoAbstract {
  public readonly data: ComputedRef<GeoType | undefined>

  public readonly lang = computed<string>(() => this.data.value?.language || 'en')
  public readonly country = computed<string>(() => this.data.value?.country || 'GB')
  public readonly code = computed<string>(() => Geo.toCode(this.data.value) || 'en-GB')
  public readonly firstDay = computed<string>(() => this.data.value?.firstDay || 'Mo')

  constructor (code?: GeoCodeType) {
    this.data = computed(() => {
      let data: GeoType | undefined

      if (code) {
        if (typeof code === 'string') {
          data = Geo.getDataByCode(code)
        } else if (isRef(code)) {
          data = Geo.getDataByCode(code.value)
        }
      }

      return data || Geo.data.value
    })
  }
}
