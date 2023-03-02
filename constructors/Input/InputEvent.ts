import { Ref } from 'vue'
import { InputChange } from './InputChange'
import { InputValidation } from './InputValidation'
import { InputValue } from './InputValue'
import { AssociativeType, ValidationType } from '../types'

export class InputEvent {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly emit: (type: string, options: AssociativeType | any) => void,
    protected readonly value: InputValue,
    protected readonly change?: InputChange,
    protected readonly validation?: InputValidation,
    protected readonly validationMessage?: Ref<string>,
    protected readonly detail?: Ref<AssociativeType>,
    protected readonly input?: Ref<HTMLInputElement | undefined>
  ) {
  }

  on (type = 'on-input'): this {
    const validation = this.validation?.get()

    this.emit(type, {
      checkValidity: this.validation?.checkValidity(),
      input: validation?.input,
      validation,
      validationMessage: this.validation?.getMessage(),
      value: this.value.get(),
      detail: this.detail?.value
    } as ValidationType)

    return this
  }

  onBlur (): void {
    this.change?.set(true)
  }

  onCancel (): void {
    this.value.reset()
    this.on().onChange()
    this.toEnd()
  }

  onChange (): void {
    this.change?.set(true)
    this.on('on-change')
  }

  onChecked (event: Event): void {
    this.value.setByChecked(event)
    this.on().onChange()
  }

  onInput (event: Event | AssociativeType): void {
    this.validation?.set(event)
    this.value.setByEvent(event)
    this.on()
  }

  onRadio (event: Event): void {
    this.value.setByRadio(event)
    this.on().onChange()
  }

  onSelect (event: Event): void {
    this.value.setByEvent(event)
    this.on().onChange()
  }

  private toEnd (): void {
    const ob = this.input?.value as AssociativeType

    if ('toEnd' in ob) {
      requestAnimationFrame(() => (this.input?.value as AssociativeType)?.toEnd())
    }
  }
}
