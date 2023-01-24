import { computed, ComputedRef, ref, Ref } from 'vue'
import { AssociativeType } from '../types'
import { InputValidationType } from './types'
import { createElement } from '../../functions'

export class InputValidation {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly input: ComputedRef<AssociativeType>,
    protected readonly validationCode?: Ref<string | InputValidationType>,
    protected readonly validationMessage?: Ref<string>
  ) {
  }

  protected readonly element = computed<HTMLInputElement>(() => {
    return createElement(undefined, 'input', this.input.value)
  })

  check () {
    const check = this.element.value.checkValidity()

    return check
  }

  getCode (state: ValidityState): string {
    if (!state.valid && this.validationCode) {
      if (typeof this.validationCode.value === 'string') {
        return this.validationCode.value
      } else {
        return this.validationCode.value?.[this.getIndexCode(state)] || ''
      }
    }

    return ''
  }

  protected getIndexCode (state: ValidityState): string {
    return Object.entries(state).find(item => item[1])?.[0] as string
  }
}
