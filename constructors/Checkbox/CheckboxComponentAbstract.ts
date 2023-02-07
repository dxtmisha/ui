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

  protected readonly type = 'checkbox' as string
  protected readonly value: InputValue
  protected readonly change: InputChange

  protected readonly validation: InputValidation
  protected readonly event: InputEvent

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
      isRipple: this.isRipple,
      isText: this.isText,
      isValue: this.value.valueForCheckbox,
      iconBind: this.getBind(this.refs.icon, 'value'),
      inputBind: this.input,
      validationMessageBind: this.validation.message,
      valueBind: this.value.value,
      valueOriginalBind: this.value.valueForOriginal,
      messageBind: this.message,
      checkValidity: () => this.validation.checkValidity(),
      onChecked: (event: Event) => this.event.onChecked(event),
      onRadio: (event: Event) => this.event.onRadio(event)
    }
  }

  readonly isRipple = computed<boolean>(() => this.props.ripple && !this.props.disabled)
  readonly isText = computed<boolean>(() => isFilled(this.props.text) || 'default' in this.context.slots)

  readonly input = computed<AssociativeType>(() => {
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

  readonly message = computed<AssociativeType>(() => {
    return {
      disabled: this.props.disabled,
      helperMessage: this.props.helperMessage,
      validationMessage: this.validation.message.value
    }
  })
}
