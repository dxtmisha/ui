import { computed } from 'vue'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { FieldProps } from '../Field/FieldProps'
import { InputChange } from '../Input/InputChange'
import { InputCounter } from '../Input/InputCounter'
import { InputEvent } from '../Input/InputEvent'
import { InputValue } from '../Input/InputValue'
import { InputValidation } from '../Input/InputValidation'
import { props } from './props'
import { AssociativeType } from '../types'
import { TextareaSetupType } from './types'

export abstract class TextareaComponentAbstract extends ComponentAbstract<HTMLTextAreaElement> {
  static readonly instruction = props as AssociativeType
  static readonly emits = [
    'on-input',
    'on-change',
    'update:value',
    'update:modelValue'
  ] as string[]

  protected readonly field: FieldProps

  protected readonly value: InputValue
  protected readonly change: InputChange
  protected readonly counter: InputCounter

  protected readonly validation: InputValidation
  protected readonly event: InputEvent

  constructor (
    protected readonly props: AssociativeType & object,
    protected readonly context: AssociativeType & object
  ) {
    super(props, context)

    this.field = new FieldProps(props)

    this.value = InputValue.init(this.refs, this.context)
    this.change = new InputChange(
      this.value,
      this.refs.validationMessage
    )
    this.counter = new InputCounter(
      this.value,
      this.refs.counter
    )

    this.validation = new InputValidation(
      this.input,
      this.value,
      this.change,
      undefined,
      this.refs.validationCode,
      this.refs.validationMessage
    )
    this.event = new InputEvent(
      this.context.emit,
      this.value,
      this.change,
      this.validation,
      this.refs.validationMessage
    )
  }

  setup (): TextareaSetupType {
    const classes = this.getClasses()
    const styles = this.getStyles()

    return {
      ...this.getBasic(),
      classes,
      styles,
      fieldBind: this.field.get(),
      inputBind: this.input,
      counterBind: this.counter.item,
      validationMessageBind: this.validation.message,
      valueBind: this.value.value,
      valueOriginalBind: this.value.valueForOriginal,
      checkValidity: () => this.validation.checkValidity(),
      onBlur: () => this.event.onBlur(),
      onChange: () => this.event.onChange(),
      onInput: (event: Event) => this.event.onInput(event)
    }
  }

  protected readonly input = computed<AssociativeType>(() => {
    return {
      name: this.refs.name.value,
      required: this.refs.required.value,
      autofocus: this.refs.autofocus.value,
      inputmode: this.refs.inputmode.value,
      minlength: this.refs.minlength.value,
      maxlength: this.refs.maxlength.value,
      placeholder: this.refs.placeholder.value,
      spellcheck: this.refs.spellcheck.value,
      readonly: this.refs.readonly.value,
      disabled: this.refs.disabled.value,
      height: this.refs.height.value,
      ...this.refs.input.value
    }
  })
}
