import { ref } from 'vue'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { InputValue } from '../Input/InputValue'
import { TextareaAutosizeResize } from './TextareaAutosizeResize'
import { props } from './props'
import { AssociativeType } from '../types'
import { TextareaAutosizeClassesType, TextareaAutosizeSetupType } from './types'

export abstract class TextareaAutosizeComponentAbstract extends ComponentAbstract<HTMLTextAreaElement> {
  static readonly instruction = props as AssociativeType
  static readonly emits = [
    'on-blur',
    'on-input',
    'on-change',
    'update:value',
    'update:modelValue'
  ] as string[]

  protected readonly stylesProps = ['height'] as string[]

  protected readonly cloneElement = ref<HTMLDivElement>()

  private readonly value: InputValue
  private readonly resize: TextareaAutosizeResize

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
