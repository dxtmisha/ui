import { ComputedRef, ref, Ref } from 'vue'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { InputValue } from '../Input/InputValue'
import { props } from './props'
import { AssociativeType, BooleanOrNumberOrStringType, ComponentAssociativeType, ComponentBaseType } from '../types'
import { TextareaAutosizeResize } from './TextareaAutosizeResize'

export type TextareaAutosizeClassesType = {
  main: ComponentAssociativeType
  clone: ComponentAssociativeType
}

export type TextareaAutosizeSetupType = ComponentBaseType & {
  classes: ComputedRef<TextareaAutosizeClassesType>
  cloneElement: Ref<HTMLDivElement | undefined>
  valueBind: Ref<BooleanOrNumberOrStringType>
  onBlur: () => void
  onChange: () => void
  onInput: (event: Event) => void
}

export abstract class TextareaAutosizeComponentAbstract extends ComponentAbstract<HTMLTextAreaElement> {
  static readonly instruction = props as AssociativeType
  static readonly emits = [
    'on-blur',
    'on-input',
    'on-change',
    'update:value',
    'update:modelValue'
  ] as string[]

  protected readonly cloneElement = ref<HTMLDivElement>()

  protected readonly value: InputValue
  protected readonly resize: TextareaAutosizeResize

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
    this.resize = new TextareaAutosizeResize(
      this.element,
      this.cloneElement,
      this.value.value
    )
  }

  setup (): TextareaAutosizeSetupType {
    const classes = this.getClasses<TextareaAutosizeClassesType>()
    const styles = this.getStyles()

    return {
      ...this.getBasic(),
      classes,
      styles,
      cloneElement: this.cloneElement,
      valueBind: this.value.value,
      onBlur: () => this.onBlur(),
      onChange: () => this.onChange(),
      onInput: (event: Event) => this.onInput(event)
    }
  }

  on (type = 'on-input'): this {
    this.context.emit(type, this.value.get())
    return this
  }

  onBlur (): void {
    this.on('on-blur')
  }

  onChange (): void {
    this.on('on-change')
  }

  onInput (event: Event | AssociativeType): void {
    this.value.setByEvent(event)
    this.on()
  }
}