import { computed, Ref } from 'vue'
import { InputValue } from './InputValue'

export class InputArrow {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly value: InputValue,
    protected readonly arrow?: Ref<boolean>,
    protected readonly minIn?: Ref<number | undefined>,
    protected readonly manIn?: Ref<number | undefined>,
    protected readonly stepIn?: Ref<number | undefined>
  ) {
  }

  min = computed<number | undefined>(() => typeof this.minIn?.value === 'number' ? (this.minIn?.value || undefined) : undefined)
  max = computed<number | undefined>(() => typeof this.manIn?.value === 'number' ? (this.manIn?.value || undefined) : undefined)
  step = computed<number>(() => this.stepIn?.value || 1)

  isPrevious = computed<boolean>(() => this.min.value !== undefined && this.value.getByNumber() <= this.min.value)
  isNext = computed<boolean>(() => this.max.value !== undefined && this.value.getByNumber() >= this.max.value)

  setPrevious (): this {
    if (!this.isPrevious.value) {
      this.value.set(this.value.getByNumber() - 1)
    }

    return this
  }

  setNext (): this {
    if (!this.isNext.value) {
      this.value.set(this.value.getByNumber() + 1)
    }

    return this
  }
}
