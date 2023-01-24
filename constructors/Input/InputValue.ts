import { ref, Ref, watch } from 'vue'
import { NumberOrStringType } from '../types'

export class InputValue {
  readonly value = ref<number | string>('')

  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly valueIn: Ref<NumberOrStringType>,
    protected readonly modelValue = valueIn as Ref<NumberOrStringType>
  ) {
    watch([this.valueIn, this.modelValue], () => this.update())
    this.update()
  }

  get () {
    return this.value.value
  }

  set (value: NumberOrStringType): this {
    this.value.value = value
    return this
  }

  protected update (): this {
    this.value.value = this.valueIn.value || this.modelValue.value
    return this
  }
}
