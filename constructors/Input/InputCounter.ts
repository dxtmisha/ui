import { computed, Ref } from 'vue'
import { InputValue } from './InputValue'
import { NumberOrUndefinedType } from '../types'

export class InputCounter {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly value: InputValue,
    protected readonly counter?: Ref<boolean | number>
  ) {
  }

  readonly item = computed<NumberOrUndefinedType>(() => {
    if (typeof this.counter?.value === 'number') {
      return this.counter?.value
    } else {
      return this.counter?.value !== false ? this.value.getLength() : undefined
    }
  })

  get (): NumberOrUndefinedType {
    return this.item.value
  }
}
