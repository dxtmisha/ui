import { Ref } from 'vue'
import { MaskTypeType } from './types'
import { GeoDateType } from '../types'

export class MaskType {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly type: Ref<MaskTypeType>
  ) {
  }

  get () {
    return this.type.value
  }

  getTypeDate (): GeoDateType {
    return this.isDate() ? (this.type.value as GeoDateType) : 'date'
  }

  isCurrency () {
    return this.type.value === 'currency'
  }

  isCurrencyOrNumber (): boolean {
    return ['number', 'currency'].indexOf(this.type.value) !== -1
  }

  isNumber () {
    return this.type.value === 'number'
  }

  isDate (): boolean {
    return ['datetime', 'date', 'month', 'time', 'second'].indexOf(this.type.value) !== -1
  }

  isTime (): boolean {
    return ['datetime', 'time', 'second'].indexOf(this.type.value) !== -1
  }
}
