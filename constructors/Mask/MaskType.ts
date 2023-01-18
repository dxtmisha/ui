import { Ref } from 'vue'
import { MaskTypeType } from './types'

export class MaskType {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly type: Ref<MaskTypeType>
  ) {
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
    return ['text', 'number', 'currency'].indexOf(this.type.value) === -1
  }
}
