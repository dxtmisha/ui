import { computed } from 'vue'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { FieldMessageProps } from '../FieldMessage/FieldMessageProps'
import { InputChange } from '../Input/InputChange'
import { InputEvent } from '../Input/InputEvent'
import { InputValue } from '../Input/InputValue'
import { InputValidation } from '../Input/InputValidation'
import { UseEnabled } from '../Use/UseEnabled'
import { UseProgress } from '../Progress/UseProgress'
import { isFilled } from '../../functions'
import { props } from './props'

import { AssociativeType } from '../types'
import { CheckboxClassesType, CheckboxSetupType } from './types'
import { UseInverse } from '../Use/UseInverse'

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
  protected readonly enabled: UseEnabled

  protected readonly validation: InputValidation
  protected readonly event: InputEvent

  protected readonly inverse: UseInverse
  protected readonly progress: UseProgress

  protected readonly message: FieldMessageProps

  constructor (
    props: AssociativeType & object,
    context: AssociativeType & object,
    inverse = true as boolean
  ) {
    super(props, context)

    this.value = InputValue.init(this.refs, this.context)
    this.change = new InputChange(
      this.value,
      this.refs?.validationMessage
    )
    this.enabled = new UseEnabled(
      this.refs?.disabled,
      this.refs?.readonly,
      this.refs?.progress,
      this.refs?.ripple
    )

    this.validation = new InputValidation(
      this.input,
      this.value,
      this.change,
      undefined,
      this.refs?.validationCode,
      this.refs?.validationMessage,
      this.element
    )
    this.event = new InputEvent(
      this.context.emit,
      this.value,
      this.change,
      this.validation,
      this.refs?.validationMessage,
      this.refs?.detail
    )

    this.inverse = new UseInverse([true], inverse ? this.value.value : undefined)
    this.progress = new UseProgress('circular', this.inverse)

    this.message = new FieldMessageProps(
      this.props,
      { validationMessage: this.validation.message }
    )
  }

  setup (): CheckboxSetupType {
    const classes = this.getClasses<CheckboxClassesType>({
      main: {
        'is-error': this.validation.error
      }
    })

    return {
      ...this.getBasic(),
      classes,
      type: this.type,

      isText: this.isText,
      isValue: this.value.valueForCheckbox,
      isEnabled: this.enabled.item,
      isRipple: this.enabled.itemRipple,

      iconBind: this.getBind(this.refs?.icon, 'value'),
      inputBind: this.input,
      progressBind: this.progress.item,

      valueBind: this.value.value,
      valueOriginalBind: this.value.valueForOriginal,

      messageBind: this.message.get(),
      validationMessageBind: this.validation.message,

      checkValidity: () => this.validation.checkValidity(),
      onChecked: (event: Event) => this.event.onChecked(event),
      onRadio: (event: Event) => this.event.onRadio(event)
    }
  }

  private readonly isText = computed<boolean>(() => isFilled(this.props?.text) || 'default' in this.context.slots)

  private readonly input = computed<AssociativeType>(() => {
    return {
      name: this.props?.name,
      value: this.props?.valueDefault,
      required: this.props?.required,
      readonly: this.props?.readonly,
      disabled: this.props?.disabled || this.props?.readonly,
      type: this.type,
      ...this.props?.input
    }
  })
}
