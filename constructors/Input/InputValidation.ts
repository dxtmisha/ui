import { computed, ComputedRef, ref, Ref } from 'vue'
import { createElement } from '../../functions/element'

import { InputChange } from './InputChange'
import { InputMatch } from './InputMatch'
import { InputValue } from './InputValue'

import { AssociativeType } from '../types'
import { InputValidationType, InputValidityType } from './types'

export class InputValidation {
  protected readonly validation = ref<InputValidationType | undefined>()

  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly input: ComputedRef<AssociativeType>,
    protected readonly value: InputValue,
    protected readonly change?: InputChange,
    protected readonly match?: InputMatch,
    protected readonly validationCode?: Ref<string | InputValidityType>,
    protected readonly validationMessage?: Ref<string>,
    protected readonly elementMain?: Ref<HTMLInputElement | undefined>
  ) {
  }

  protected readonly element = computed<HTMLInputElement>(
    () => createElement<HTMLInputElement>(undefined, 'input', this.input.value)
  )

  readonly error = computed<boolean>(() => !this.checkValidity())

  protected readonly isCheckbox = computed(() => ['checkbox'].indexOf(this.element.value.type) !== -1)

  readonly item = computed<InputValidationType | undefined>(() => {
    if (this.change?.get() !== false) {
      return this.checkGlobal() || this.check() || this.match?.check()
    } else {
      return undefined
    }
  })

  readonly message = computed<string>(() => this.item.value?.validationMessage || '')

  protected check (): InputValidationType | undefined {
    const input = this.getInput()
    const check = input.checkValidity()

    this.removeChild()

    if (check) {
      return undefined
    } else {
      return {
        input,
        checkValidity: true,
        validationMessage: this.getCode(input.validity) || input.validationMessage,
        validity: input.validity
      }
    }
  }

  protected checkGlobal (): InputValidationType | undefined {
    if (this.validationMessage?.value) {
      return {
        checkValidity: true,
        validationMessage: this.validationMessage.value
      }
    } else if (this.validation.value) {
      return this.validation.value
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

  set (validation: InputValidationType | AssociativeType): this {
    if (
      'checkValidity' in validation &&
      'validationMessage' in validation
    ) {
      this.validation.value = {
        checkValidity: validation.checkValidity,
        input: validation.input,
        validity: validation.validity,
        validationMessage: validation.validationMessage
      }
    } else {
      this.validation.value = undefined
    }

    return this
  }

  protected getIndexCode (state: ValidityState): string {
    if (state.badInput) {
      return 'badInput'
    } else if (state.customError) {
      return 'customError'
    } else if (state.patternMismatch) {
      return 'patternMismatch'
    } else if (state.rangeOverflow) {
      return 'rangeOverflow'
    } else if (state.rangeUnderflow) {
      return 'rangeUnderflow'
    } else if (state.stepMismatch) {
      return 'stepMismatch'
    } else if (state.tooLong) {
      return 'tooLong'
    } else if (state.tooShort) {
      return 'tooShort'
    } else if (state.typeMismatch) {
      return 'typeMismatch'
    } else if (state.valueMissing) {
      return 'valueMissing'
    } else {
      return ''
    }
  }

  protected getInput (): HTMLInputElement {
    const input = this.element.value

    if (this.isCheckbox.value) {
      input.checked = this.value.is()
    } else {
      input.value = this.value.get().toString().trim()
    }

    if (this.elementMain?.value && input && !input.parentElement) {
      this.elementMain.value?.parentElement?.append(input)
    }

    return input
  }

  protected removeChild (): void {
    this.element.value?.parentElement?.removeChild(this.element.value)
  }
}
