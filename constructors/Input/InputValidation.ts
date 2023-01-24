import { computed, ComputedRef, Ref } from 'vue'
import { AssociativeType } from '../types'
import { InputValidationType } from './types'
import { InputValue } from './InputValue'
import { createElement } from '../../functions'

export class InputValidation {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly input: ComputedRef<AssociativeType>,
    protected readonly value: InputValue,
    protected readonly validationCode?: Ref<string | InputValidationType>,
    protected readonly validationMessage?: Ref<string>
  ) {
  }

  protected readonly element = computed<HTMLInputElement>(() => {
    return createElement(undefined, 'input', this.input.value)
  })

  protected check () {
    const check = this.checkValidity()

    return check
  }

  checkValidity (): boolean {
    this.element.value.value = this.value.get().toString()
    return this.element.value.checkValidity()
  }

  getCode (state: ValidityState): string | undefined {
    if (!state.valid && this.validationCode) {
      if (typeof this.validationCode.value === 'string') {
        return this.validationCode.value
      } else {
        return this.validationCode.value?.[this.getIndexCode(state)]
      }
    }

    return undefined
  }

  protected getIndexCode (state: ValidityState): string {
    return Object.entries(state).find(item => item[1])?.[0] as string
  }
}
