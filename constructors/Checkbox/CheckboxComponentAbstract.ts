import { computed } from 'vue'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { InputEvent } from '../Input/InputEvent'
import { InputValue } from '../Input/InputValue'
import { InputValidation } from '../Input/InputValidation'
import { props } from './props'
import { AssociativeType } from '../types'
import { CheckboxSetupType } from './types'

export abstract class CheckboxComponentAbstract extends ComponentAbstract<HTMLInputElement> {
  static readonly instruction = props as AssociativeType
  static readonly emits = [
    'on-input',
    'on-change',
    'update:value',
    'update:modelValue'
  ] as string[]

  protected readonly type = 'checkbox' as string
  protected readonly value: InputValue

  protected readonly validation: InputValidation
  protected readonly event: InputEvent

  constructor (
    protected readonly props: AssociativeType & object,
    protected readonly context: AssociativeType & object
  ) {
    super(props, context)

    this.value = InputValue.init(this.refs, this.context)
    this.validation = new InputValidation(
      this.input,
      this.value,
      undefined,
      undefined,
      this.refs.validationCode,
      this.refs.validationMessage
    )
    this.event = new InputEvent(
      this.context.emit,
      this.value,
      undefined,
      this.validation,
      this.refs.validationMessage
    )
  }

  setup (): CheckboxSetupType {
    const classes = this.getClasses()
    const styles = this.getStyles()

    return {
      ...this.getBasic(),
      classes,
      styles,
      inputBind: this.input,
      validationMessageBind: this.validation.message,
      valueBind: this.value.value,
      valueOriginalBind: this.value.valueForOriginal,
      checkValidity: () => this.validation.checkValidity(),
      onChange: () => this.event.onChange(),
      onInput: (event: Event) => this.event.onInput(event)
    }
  }

  protected readonly input = computed<AssociativeType>(() => {
    return {
      name: this.refs.name.value,
      required: this.refs.required.value,
      readonly: this.refs.readonly.value,
      disabled: this.refs.disabled.value,
      type: this.type,
      ...this.refs.input.value
    }
  })
}
