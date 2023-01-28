import { computed } from 'vue'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { FieldProps } from '../Field/FieldProps'
import { InputArrow } from './InputArrow'
import { InputChange } from './InputChange'
import { InputCounter } from './InputCounter'
import { InputEvent } from './InputEvent'
import { InputMatch } from './InputMatch'
import { InputValue } from './InputValue'
import { InputValidation } from './InputValidation'
import { getClipboardData } from '../../functions'
import { props } from './props'
import { AssociativeType } from '../types'
import { InputClassesType, InputSetupType } from './types'

export abstract class InputComponentAbstract extends ComponentAbstract<HTMLInputElement> {
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

    this.value = new InputValue(
      this.refs.value,
      this.refs.modelValue,
      this.refs.readonly
    )
    this.change = new InputChange(
      this.value,
      this.refs.validationMessage
    )
    this.counter = new InputCounter(
      this.value,
      this.refs.counter
    )
    this.arrow = new InputArrow(
      this.value,
      this.refs.arrow,
      this.refs.min,
      this.refs.max
    )

    this.match = new InputMatch(
      this.element,
      this.refs.inputMatch,
      this.value
    )
    this.validation = new InputValidation(
      this.input,
      this.value,
      this.change,
      this.match,
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

  setup (): InputSetupType {
    const classes = this.getClasses<InputClassesType>()
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
      disabledPrevious: this.arrow.isPrevious,
      disabledNext: this.arrow.isNext,
      onBlur: () => this.event.onBlur(),
      onKeypress: (event: KeyboardEvent) => this.onKeypress(event),
      onPaste: (event: ClipboardEvent) => this.onPaste(event),
      onChange: () => this.event.onChange(),
      onInput: (event: Event) => this.event.onInput(event),
      onPrevious: () => this.onPrevious(),
      onNext: () => this.onNext(),
      onCancel: () => this.event.onCancel()
    }
  }

  protected readonly input = computed<AssociativeType>(() => {
    return {
      name: this.refs.name.value,
      required: this.refs.required.value,
      autocomplete: this.refs.autocomplete.value,
      autofocus: this.refs.autofocus.value,
      inputmode: this.refs.inputmode.value,
      step: this.refs.step.value,
      min: this.refs.min.value,
      max: this.refs.max.value,
      minlength: this.refs.minlength.value,
      maxlength: this.refs.maxlength.value,
      pattern: this.pattern.value,
      placeholder: this.refs.placeholder.value,
      spellcheck: this.refs.spellcheck.value,
      readonly: this.refs.readonly.value,
      disabled: this.refs.disabled.value,
      type: this.refs.type.value,
      ...this.refs.input.value
    }
  })

  protected readonly pattern = computed(() => {
    if (this.props.pattern) {
      return this.props.pattern
    } else if (this.props.type === 'email') {
      return '[\\S]+@[\\S]{2,}\\.[\\w]{2,}'
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
}
