import { computed, ref, Ref, ToRefs, watch } from 'vue'
import { isFilled } from '../../functions'
import { AssociativeType, BooleanOrNumberOrStringType } from '../types'

export class InputValue {
  readonly value = ref<BooleanOrNumberOrStringType>('')
  readonly prefill = ref<boolean>(false)

  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly emit: (type: string, options: AssociativeType | any) => void,
    private readonly valueIn: Ref<BooleanOrNumberOrStringType>,
    private readonly modelValue = valueIn as Ref<BooleanOrNumberOrStringType>
  ) {
    watch([this.valueIn, this.modelValue], () => this.update())
    watch(this.value, value => {
      this.emit('update:value', value)
      this.emit('update:modelValue', value)
    })

    this.update()
  }

  readonly valueForInput = computed<string>(() => this.toString(this.value.value))
  readonly valueForCheckbox = computed<boolean>(() => isFilled(this.value.value))
  readonly valueForOriginal = computed<string>(() => this.toString(this.valueIn.value || this.modelValue.value))

  readonly isValue = computed<boolean>(() => this.prefill.value || !!this.value.value)

  get (): BooleanOrNumberOrStringType {
    return this.value.value
  }

  getByNumber (): number {
    return parseFloat(this.get().toString() || '0')
  }

  getLength (): number {
    const value = this.get()

    return Array.isArray(value) ? value.length : value?.toString()?.length || 0
  }

  protected getValueByTarget (target: HTMLInputElement): this {
    this.set(['checkbox'].indexOf(target.type) !== -1 ? target.checked : target.value)
    return this
  }

  is (): boolean {
    return this.valueForCheckbox.value
  }

  isPrefill (): boolean {
    return this.isValue.value
  }

  reset (): this {
    this.value.value = ''
    return this
  }

  set (value: BooleanOrNumberOrStringType): this {
    this.value.value = value

    return this
  }

  setByChecked (event: Event): this {
    this.set((event.target as HTMLInputElement).checked)
    return this
  }

  setByRadio (event: Event): this {
    const input = event.target as HTMLInputElement

    this.set(input.checked ? input.value : '')
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

        if ('isValue' in eventValue) {
          this.prefill.value = eventValue.isValue
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

  protected toString (value: BooleanOrNumberOrStringType): string {
    if (typeof value === 'boolean') {
      return value ? '1' : '0'
    } else if (isFilled(value)) {
      return value?.toString() || ''
    } else {
      return ''
    }
  }

  protected update (): this {
    this.value.value = this.valueIn.value || this.modelValue.value || ''
    return this
  }

  static init (refs: ToRefs<AssociativeType>, context: AssociativeType) {
    return new InputValue(
      context.emit,
      refs?.value,
      refs?.modelValue
    )
  }
}
