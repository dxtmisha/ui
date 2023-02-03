import { computed, ref, Ref, ToRefs, watch } from 'vue'
import { AssociativeType, BooleanOrNumberOrStringType } from '../types'
import { isFilled } from '../../functions'

export class InputValue {
  readonly value = ref<BooleanOrNumberOrStringType>('')

  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly emit: (type: string, options: AssociativeType | any) => void,
    protected readonly valueIn: Ref<BooleanOrNumberOrStringType>,
    protected readonly modelValue = valueIn as Ref<BooleanOrNumberOrStringType>,
    protected readonly readonly?: Ref<boolean>
  ) {
    watch([this.valueIn, this.modelValue], () => this.update())
    watch(this.value, value => {
      this.emit('update:value', value)
      this.emit('update:modelValue', value)
    })

    this.update()
  }

  readonly valueForInput = computed<string>(() => this.toString(this.value.value))
  readonly valueForOriginal = computed<string>(() => this.toString(this.valueIn.value || this.modelValue.value))

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
      refs.value,
      refs.modelValue,
      refs.readonly
    )
  }
}
