import { computed, ComputedRef, Ref } from 'vue'
import { InputMatch } from './InputMatch'
import { InputValue } from './InputValue'
import { createElement } from '../../functions'
import { AssociativeType } from '../types'
import { InputValidationType, InputValidityType } from './types'

export class InputValidation {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly input: ComputedRef<AssociativeType>,
    protected readonly value: InputValue,
    protected readonly match?: InputMatch,
    protected readonly validationCode?: Ref<string | InputValidityType>,
    protected readonly validationMessage?: Ref<string>
  ) {
  }

  protected readonly element = computed<HTMLInputElement>(() => {
    return createElement(undefined, 'input', this.input.value)
  })

  readonly item = computed<InputValidationType | undefined>(
    () => this.checkGlobal() || this.check() || this.match?.check()
  )

  readonly message = computed<string>(() => this.item.value?.validationMessage || '')

  protected check (): InputValidationType | undefined {
    const input = this.element.value

    input.value = this.value.get().toString().trim()

    if (input.checkValidity()) {
      return undefined
    } else {
      return {
        input,
        status: true,
        validationMessage: input.validationMessage,
        validity: input.validity
      }
    }
  }

  protected checkGlobal (): InputValidationType | undefined {
    if (this.validationMessage?.value) {
      return {
        status: true,
        validationMessage: this.validationMessage.value
      }
    } else {
      return undefined
    }
  }

  checkValidity (): boolean {
    return this.item.value === undefined
  }

  get (): InputValidationType | undefined {
    return this.item.value
  }

  getMessage (): string {
    return this.message.value
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
