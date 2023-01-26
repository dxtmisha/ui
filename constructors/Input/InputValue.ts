import { ref, Ref, watch } from 'vue'
import { AssociativeType, BooleanOrNumberOrStringType } from '../types'

export class InputValue {
  readonly value = ref<BooleanOrNumberOrStringType>('')

  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly valueIn: Ref<BooleanOrNumberOrStringType>,
    protected readonly modelValue = valueIn as Ref<BooleanOrNumberOrStringType>,
    protected readonly readonly?: Ref<boolean>
  ) {
    watch([this.valueIn, this.modelValue], () => this.update())
    this.update()
  }

  get (): BooleanOrNumberOrStringType {
    return this.value.value
  }

  protected getValueByTarget (target: HTMLInputElement): this {
    this.set(target.type === 'checkbox' ? target.checked : target.value)
    return this
  }

  reset (): this {
    this.value.value = ''
    return this
  }

  set (value: BooleanOrNumberOrStringType): this {
    if (this.readonly?.value !== true) {
      this.value.value = value
    }

    return this
  }

  setByChecked (event: Event): this {
    this.set((event.target as HTMLInputElement).checked)
    return this
  }

  setByEvent (event: Event): this
  setByEvent (value: AssociativeType): this
  setByEvent (value: BooleanOrNumberOrStringType): this
  setByEvent (eventValue: Event | AssociativeType | BooleanOrNumberOrStringType): this {
    switch (typeof eventValue) {
      case 'object':
        if ('value' in eventValue) {
          this.set(eventValue.value)
        } else if ('valueBind' in eventValue) {
          this.set(eventValue.valueBind)
        } else if ('target' in eventValue) {
          this.getValueByTarget(eventValue.target as HTMLInputElement)
        }

        break
      case 'boolean':
      case 'number':
      case 'string':
        this.set(eventValue)
        break
    }

    return this
  }

  protected update (): this {
    this.value.value = this.valueIn.value || this.modelValue.value || ''
    return this
  }
}
