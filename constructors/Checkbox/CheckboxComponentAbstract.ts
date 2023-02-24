import { computed } from 'vue'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { InputChange } from '../Input/InputChange'
import { InputEvent } from '../Input/InputEvent'
import { InputValue } from '../Input/InputValue'
import { InputValidation } from '../Input/InputValidation'
import { isFilled } from '../../functions'
import { props } from './props'

import { AssociativeType } from '../types'
import { CheckboxClassesType, CheckboxSetupType } from './types'

export abstract class CheckboxComponentAbstract extends ComponentAbstract<HTMLInputElement> {
  static readonly instruction = props as AssociativeType
  static readonly emits = [
    'on-input',
    'on-change',
    'update:value',
    'update:modelValue'
  ] as string[]

  private readonly type = 'checkbox' as string
  private readonly value: InputValue
  private readonly change: InputChange

  private readonly validation: InputValidation
  private readonly event: InputEvent

  constructor (
    protected readonly props: AssociativeType & object,
    protected readonly context: AssociativeType & object
  ) {
    super(props, context)

    this.value = InputValue.init(this.refs, this.context)
    this.change = new InputChange(
      this.value,
      this.refs.validationMessage
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

  setup (): CheckboxSetupType {
    const classes = this.getClasses<CheckboxClassesType>({
      main: {
        'is-error': this.validation.error
      }
    })
    const styles = this.getStyles()

    return {
      ...this.getBasic(),
      classes,
      styles,
      type: this.type,
      isText: this.isText,
      isValue: this.value.valueForCheckbox,
      isRipple: this.isRipple,

      iconBind: this.getBind(this.refs.icon, 'value'),

      inputBind: this.input,
      valueBind: this.value.value,
      valueOriginalBind: this.value.valueForOriginal,

      messageBind: this.message,
      validationMessageBind: this.validation.message,

      checkValidity: () => this.validation.checkValidity(),
      onChecked: (event: Event) => this.event.onChecked(event),
      onRadio: (event: Event) => this.event.onRadio(event)
    }
  }

  private readonly isText = computed<boolean>(() => isFilled(this.props.text) || 'default' in this.context.slots)
  private readonly isRipple = computed<boolean>(() => this.props.ripple && !this.props.disabled)

  private readonly input = computed<AssociativeType>(() => {
    return {
      name: this.refs.name.value,
      value: this.refs.valueDefault.value,
      required: this.refs.required.value,
      readonly: this.refs.readonly.value,
      disabled: this.refs.disabled.value,
      type: this.type,
      ...this.refs.input.value
    }
  })

  private readonly message = computed<AssociativeType>(() => {
    return {
      disabled: this.props.disabled,
      helperMessage: this.props.helperMessage,
      validationMessage: this.validation.message.value
    }
  })
}
