import { Ref, watch } from 'vue'
import { InputChange } from './InputChange'
import { InputValidation } from './InputValidation'
import { InputValue } from './InputValue'
import { AssociativeType, ValidationType } from '../types'

export class InputEvent {
  constructor (
    protected readonly emit: (type: string, options: AssociativeType | any) => void,
    protected readonly value: InputValue,
    protected readonly change?: InputChange,
    protected readonly validation?: InputValidation,
    protected readonly validationMessage?: Ref<string>
  ) {
    watch(this.value.value, value => {
      this.emit('update:value', value)
      this.emit('update:modelValue', value)
    })
  }

  on (type = 'on-input'): this {
    const validation = this.validation?.get()

    this.emit(type, {
      checkValidity: this.validation?.checkValidity(),
      input: validation?.input,
      validation,
      validationMessage: this.validation?.getMessage(),
      value: this.value.get()
    } as ValidationType)

    return this
  }

  onCancel (): void {
    this.value.reset()
    this.on().onChange()
  }

  onChange (): void {
    this.change?.set(true)
    this.on('on-change')
  }

  onChecked (event: Event): void {
    this.value.setByChecked(event)
    this.on().onChange()
  }

  onInput (event: Event): void {
    this.value.setByEvent(event)
    this.on()
  }

  onSelect (event: Event): void {
    this.value.setByEvent(event)
    this.on().onChange()
  }
}
