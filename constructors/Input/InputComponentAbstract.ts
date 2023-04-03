import { computed } from 'vue'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { getClipboardData } from '../../functions/data'
import { props } from './props'

import { FieldProps } from '../Field/FieldProps'
import { InputArrow } from './InputArrow'
import { InputChange } from './InputChange'
import { InputCounter } from './InputCounter'
import { InputEvent } from './InputEvent'
import { InputMatch } from './InputMatch'
import { InputType } from './InputType'
import { InputValue } from './InputValue'
import { InputValidation } from './InputValidation'

import { AssociativeType } from '../types'
import { InputSetupType } from './types'

export abstract class InputComponentAbstract extends ComponentAbstract<HTMLInputElement> {
  static readonly instruction = props as AssociativeType
  static readonly emits = [
    'on-input',
    'on-change',
    'update:value',
    'update:modelValue'
  ] as string[]

  protected readonly field: FieldProps

  protected readonly type: InputType
  protected readonly value: InputValue
  protected readonly change: InputChange
  protected readonly counter: InputCounter
  protected readonly arrow: InputArrow

  protected readonly match: InputMatch
  protected readonly validation: InputValidation
  protected readonly event: InputEvent

  constructor (
    protected readonly props: AssociativeType & object,
    protected readonly context: AssociativeType & object
  ) {
    super(props, context)

    this.field = new FieldProps(props)

    this.type = new InputType(
      this.refs?.type,
      this.refs?.iconVisibility,
      this.refs?.iconVisibilityOff
    )
    this.value = InputValue.init(
      this.refs,
      this.context,
      this.element
    )
    this.change = new InputChange(
      this.value,
      this.refs?.validationMessage
    )
    this.counter = new InputCounter(
      this.value,
      this.refs?.counter
    )
    this.arrow = new InputArrow(
      this.value,
      this.refs?.arrow,
      this.refs?.min,
      this.refs?.max
    )

    this.match = new InputMatch(
      this.element,
      this.refs?.inputMatch,
      this.value
    )
    this.validation = new InputValidation(
      this.input,
      this.value,
      this.change,
      this.match,
      this.refs?.validationCode,
      this.refs?.validationMessage
    )
    this.event = new InputEvent(
      this.context.emit,
      this.value,
      this.change,
      this.validation,
      this.refs?.validationMessage,
      this.refs?.detail,
      this.element
    )
  }

  setup (): InputSetupType {
    const classes = this.getClasses()
    const styles = this.getStyles()

    return {
      ...this.getBasic(),
      classes,
      styles,
      fieldBind: this.field.get(),
      iconTrailingBind: this.iconTrailingBind,
      inputBind: this.input,
      maskBind: this.maskBind,
      counterBind: this.counter.item,

      isValue: this.value.isValue,
      valueBind: this.value.value,
      valueOriginalBind: this.value.valueForOriginal,

      validationMessageBind: this.validation.message,

      disabledNext: this.arrow.isNext,
      disabledPrevious: this.arrow.isPrevious,

      checkValidity: () => this.validation.checkValidity(),
      onBlur: () => this.event.onBlur(),
      onKeypress: (event: KeyboardEvent) => this.onKeypress(event),
      onPaste: (event: ClipboardEvent) => this.onPaste(event),

      onInput: (event: Event) => this.event.onInput(event),
      onChange: () => this.event.onChange(),
      onNext: () => this.onNext(),
      onPrevious: () => this.onPrevious(),
      onCancel: () => this.event.onCancel(),
      onTrailing: () => this.onTrailing()
    }
  }

  protected readonly iconTrailingBind = computed<AssociativeType | string | undefined>(() => {
    if (this.props.iconTrailing) {
      return this.props.iconTrailing
    } else if (this.props.type === 'password') {
      return this.type.getIcon()
    } else {
      return undefined
    }
  })

  protected readonly input = computed<AssociativeType>(() => {
    return {
      name: this.props.name,
      required: this.props.required,
      autocomplete: this.props.autocomplete,
      autofocus: this.props.autofocus,
      inputmode: this.props.inputmode,
      step: this.props.step,
      min: this.props.min,
      max: this.props.max,
      minlength: this.props.minlength,
      maxlength: this.props.maxlength,
      pattern: this.pattern.value,
      placeholder: this.props.placeholder,
      spellcheck: this.props.spellcheck,
      readonly: this.props.readonly,
      disabled: this.props.disabled,
      type: this.type.get(),
      ...this.props.input
    }
  })

  protected readonly maskBind = computed<AssociativeType | undefined>(() => {
    switch (this.type.get()) {
      case 'date':
      case 'datetime':
      case 'month':
      case 'second':
      case 'time':
        return {
          type: this.type.get(),
          ...(this.props.mask || {})
        }
      default:
        return this.props.mask ? this.getBind(this.refs.mask, 'mask').value : undefined
    }
  })

  protected readonly pattern = computed(() => {
    if (this.props.pattern) {
      return this.props.pattern
    } else if (this.props.type === 'email') {
      return '[\\S]+@[\\S]{2,}\\.[\\w]{2,}'
    } else if (this.props.type === 'password') {
      return '[0-9a-zA-Z-!@#$%^&*]+'
    } else {
      return undefined
    }
  })

  onKeypress (event: KeyboardEvent) {
    if (
      this.props.type === 'tel' &&
      !event.key.toString().match(/[0-9]/)
    ) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  async onPaste (event: ClipboardEvent) {
    if (this.props.type === 'tel') {
      const paste = (await getClipboardData(event)).replace(/[^0-9]+/ig, '')

      if (
        paste &&
        paste.length > 0
      ) {
        event.preventDefault()

        const target = event.target as HTMLInputElement
        const start = target.selectionStart || 0
        const end = target.selectionEnd || 0
        const value = target.value
        const selection = start + paste.length

        this.value.set(
          `${value.substring(0, start)}${paste}${value.substring(end)}`
        )

        requestAnimationFrame(() => {
          target.selectionEnd = selection
          target.selectionStart = selection
        })

        this.event.on()
      }
    }
  }

  onPrevious (): void {
    this.arrow.setPrevious()
    this.event.on().onChange()
  }

  onNext (): void {
    this.arrow.setNext()
    this.event.on().onChange()
  }

  onTrailing (): void {
    const start = this.element.value?.selectionStart || 0
    const end = this.element.value?.selectionEnd || 0

    this.type.toggleVisibility()

    requestAnimationFrame(() => {
      if (this.element.value) {
        this.element.value.selectionEnd = start
        this.element.value.selectionStart = end
      }
    })
  }
}
