import { ComputedRef } from 'vue'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { InputValue } from '../Input/InputValue'
import { props } from './props'
import { AssociativeType, ComponentBaseType } from '../types'

export type TextareaAutosizeSetupType = ComponentBaseType & {
  valueBind: ComputedRef<string>
}

export abstract class TextareaAutosizeComponentAbstract extends ComponentAbstract<HTMLTextAreaElement> {
  static readonly instruction = props as AssociativeType
  static readonly emits = [
    'on-input',
    'on-change',
    'update:value',
    'update:modelValue'
  ] as string[]

  protected readonly value: InputValue

  constructor (
    protected readonly props: AssociativeType & object,
    protected readonly context: AssociativeType & object
  ) {
    super(props, context)

    this.value = new InputValue(
      this.context.emit,
      this.refs.value,
      this.refs.modelValue
    )
  }

  setup (): TextareaAutosizeSetupType {
    const classes = this.getClasses()
    const styles = this.getStyles()

    return {
      ...this.getBasic(),
      classes,
      styles,
      valueBind: this.value.valueForInput
    }
  }
}
