import { computed, ComputedRef, Ref } from 'vue'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { FieldProps } from '../Field/FieldProps'
import { props } from './props'
import {
  AssociativeType,
  ComponentAssociativeType,
  ComponentBaseType, NumberOrStringType
} from '../types'
import { InputValue } from './InputValue'
import { InputMatch } from './InputMatch'
import { InputValidation } from './InputValidation'

export type InputClassesType = {
  main: ComponentAssociativeType
}
export type InputSetupType = ComponentBaseType & {
  fieldBind: ComputedRef<AssociativeType>
  inputBind: ComputedRef<AssociativeType>
  valueBind: Ref<NumberOrStringType>
}

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

  protected readonly match: InputMatch
  protected readonly validation: InputValidation

  constructor (
    protected readonly props: AssociativeType & object,
    protected readonly context: AssociativeType & object
  ) {
    super(props, context)

    this.field = new FieldProps(props)
    this.value = new InputValue(
      this.refs.value,
      this.refs.modelValue
    )

    this.match = new InputMatch(
      this.element,
      this.refs.inputMatch,
      this.value
    )
    this.validation = new InputValidation(
      this.input,
      this.value,
      this.match,
      this.refs.validationCode,
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
      valueBind: this.value.value
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
      pattern: this.refs.pattern.value,
      placeholder: this.refs.placeholder.value,
      spellcheck: this.refs.spellcheck.value,
      readonly: this.refs.readonly.value,
      ...this.refs.input.value
    }
  })
}
