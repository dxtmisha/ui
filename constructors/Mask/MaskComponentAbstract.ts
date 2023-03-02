import { computed, ref, watch } from 'vue'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { getClipboardData } from '../../functions'
import { props } from './props'

import { MaskBuffer } from './MaskBuffer'
import { MaskCharacter } from './MaskCharacter'
import { MaskData } from './MaskData'
import { MaskDate } from './MaskDate'
import { MaskFocus } from './MaskFocus'
import { MaskFormat } from './MaskFormat'
import { MaskItem } from './MaskItem'
import { MaskMatch } from './MaskMatch'
import { MaskPattern } from './MaskPattern'
import { MaskRubber } from './MaskRubber'
import { MaskRubberItem } from './MaskRubberItem'
import { MaskRubberTransition } from './MaskRubberTransition'
import { MaskSelection } from './MaskSelection'
import { MaskSpecial } from './MaskSpecial'
import { MaskType } from './MaskType'
import { MaskValidation } from './MaskValidation'
import { MaskValue } from './MaskValue'
import { MaskView } from './MaskView'

import { AssociativeType, ValidationType } from '../types'
import { MaskClassesType, MaskItemsType, MaskSetupType, MaskUnidentifiedType } from './types'

export abstract class MaskComponentAbstract extends ComponentAbstract<HTMLInputElement> {
  static readonly instruction = props as AssociativeType
  static readonly emits = [
    'on-change',
    'on-blur',
    'on-focus',
    'on-input'
  ] as string[]

  protected readonly charsElement = ref<HTMLSpanElement | undefined>()
  protected readonly character = ref<string[]>([])
  protected readonly length = ref<number>(0)
  protected readonly value = ref<MaskItemsType>({})

  protected readonly type: MaskType
  protected readonly rubber: MaskRubberItem
  protected readonly transition: MaskRubberTransition

  protected readonly date: MaskDate
  protected readonly format: MaskFormat

  protected readonly match: MaskMatch
  protected readonly special: MaskSpecial
  protected readonly pattern: MaskPattern

  protected readonly rubbers: MaskRubber

  protected readonly item: MaskItem
  protected readonly selection: MaskSelection
  protected readonly characters: MaskCharacter
  protected readonly values: MaskValue

  protected readonly validation: MaskValidation
  protected readonly view: MaskView

  protected readonly focus: MaskFocus
  protected readonly buffer: MaskBuffer
  protected readonly data: MaskData

  protected change?: boolean

  protected unidentified?: MaskUnidentifiedType

  constructor (
    protected readonly props: AssociativeType & object,
    protected readonly context: AssociativeType & object
  ) {
    super(props, context)

    this.type = new MaskType(this.refs.type)
    this.rubber = new MaskRubberItem()
    this.transition = new MaskRubberTransition()

    this.date = new MaskDate(this.type, this.value)
    this.format = new MaskFormat(
      this.type,
      this.rubber,
      this.refs.currency,
      this.refs.fraction,
      this.value
    )

    this.match = new MaskMatch(this.refs.match)
    this.special = new MaskSpecial(this.type, this.refs.special)
    this.pattern = new MaskPattern(
      this.type,
      this.date,
      this.special,
      this.refs.pattern
    )

    this.rubbers = new MaskRubber(
      this.type,
      this.rubber,
      this.transition,
      this.format,
      this.match,
      this.special,
      this.value
    )

    this.item = new MaskItem(
      this.type,
      this.rubber,
      this.date,
      this.format,
      this.special,
      this.refs.mask,
      this.length
    )
    this.selection = new MaskSelection(this.item, this.special)
    this.characters = new MaskCharacter(
      this.item,
      this.selection,
      this.character,
      this.length
    )
    this.values = new MaskValue(
      this.type,
      this.transition,
      this.date,
      this.format,
      this.special,
      this.item,
      this.character,
      this.value
    )

    this.validation = new MaskValidation(
      this.pattern,
      this.values
    )
    this.view = new MaskView(
      this.type,
      this.special,
      this.rubbers,
      this.item,
      this.values,
      this.validation,
      this.refs.view,
      this.getClassName(['character'])
    )

    this.rubbers.setValue(this.values.value)

    this.focus = new MaskFocus()
    this.buffer = new MaskBuffer()
    this.data = new MaskData(
      this.element,
      this.type,
      this.transition,
      this.date,
      this.match,
      this.rubbers,
      this.item,
      this.selection,
      this.characters,
      this.values,
      this.focus,
      this.buffer
    )

    this.data.reset(this.props.value)
    watch(this.refs.value, value => this.data.reset(value))

    watch([
      this.validation.item,
      this.values.full,
      this.values.value
    ], () => {
      this.change = true
      this.on()
    })
  }

  setup (): MaskSetupType {
    const classes = this.getClasses<MaskClassesType>({
      main: { 'is-right': this.isRight }
    })

    return {
      ...this.getBasic(),
      classes,
      charsElement: this.charsElement,

      maskBind: this.item.activeMask,
      viewBind: this.view.item,
      valueBind: this.values.item,

      standard: this.standard,
      validation: this.validation.item,
      validationMessage: this.validation.message,

      reset: (value = '' as string) => this.data.reset(value),
      toEnd: (target: HTMLInputElement) => this.toEnd(target),

      onBlur: (event: FocusEvent) => this.onBlur(event),
      onChange: (event: Event) => this.onChange(event),
      onClick: (event: MouseEvent) => this.onClick(event),
      onFocus: (event: FocusEvent) => this.onFocus(event),
      onInput: (event: InputEvent) => this.onInput(event),
      onKeydown: (event: KeyboardEvent) => this.onKeydown(event),
      onKeypress: (event: KeyboardEvent) => this.onKeypress(event),
      onPaste: (event: ClipboardEvent) => this.onPaste(event)
    }
  }

  protected isRight = computed(() => this.type.isCurrencyOrNumber() || this.props.right)

  protected standard = computed<string>(() => {
    if (this.isRight.value) {
      let data = ''

      this.view.get().forEach(item => {
        data += item.value
      })

      return data
    } else {
      return this.values.getStandard()
    }
  })

  protected on (type = 'on-input') {
    const validation = this.validation.get()

    this.context.emit(type, {
      checkValidity: this.validation.checkValidity(),
      isValue: this.character?.value?.length > 0,
      value: this.values.getValue(),
      required: this.values.isFull(),
      validation,
      validationMessage: this.validation.getMessage(),
      input: validation?.input
    } as ValidationType)
  }

  protected onFocus (event: FocusEvent): void {
    this.focus.in()
    this.change = false
    this.context.emit('on-focus', event)
  }

  protected onBlur (event: FocusEvent): void {
    if (this.change) {
      this.on('on-change')
    }

    this.focus.out()
    this.context.emit('on-blur', event)
  }

  protected onClick (event: MouseEvent): void {
    this.toEnd(event.target as HTMLInputElement)
  }

  protected onKeypress (event: KeyboardEvent): void {
    const target = event.target as HTMLInputElement
    const start = target.selectionStart || 0
    const end = target.selectionEnd || 0

    if (start === end) {
      if (this.buffer.init(event.key)) {
        this.data.set(start, event.key)
      }
    } else {
      this.data.pop(start, end)
        .set(this.selection.getShift(), event.key)
    }
  }

  protected onKeydown (event: KeyboardEvent): void {
    const target = event.target as HTMLInputElement
    const start = target.selectionStart || 0
    const end = target.selectionEnd || 0

    if (event.key === 'Unidentified' || event.keyCode === 229) {
      this.unidentified = {
        start,
        end,
        length: target.value.length
      }
    } else if (event.key === 'Backspace' || event.keyCode === 8) {
      event.preventDefault()
      this.data.pop(start, end)
    }
  }

  protected onInput (event: InputEvent) {
    if (this.unidentified) {
      const target = event.target as HTMLInputElement

      if (
        this.unidentified.length > target.value.length ||
        this.unidentified.start !== this.unidentified.end
      ) {
        this.data.pop(this.unidentified.start, this.unidentified.end)
      }

      if (event.data && this.buffer.init(event.data)) {
        this.data.set(this.unidentified.start, event.data)
        target.value = this.standard.value
        requestAnimationFrame(() => this.data.goSelection())
      }

      this.unidentified = undefined
    }
  }

  protected async onPaste (event: ClipboardEvent): Promise<void> {
    const target = event.target as HTMLInputElement
    const start = target.selectionStart || 0
    const end = target.selectionEnd || 0
    const text = (await getClipboardData(event)).split('')

    if (start === end) {
      this.data.set(start, text)
    } else {
      this.data.pop(start, end)
        .set(this.selection.getShift(), text)
    }
  }

  onChange (event: Event): void {
    this.data.reset((event.target as HTMLInputElement).value)
  }

  protected toEnd (target = this.element.value as HTMLInputElement | undefined): void {
    if (target && this.isRight.value) {
      const length = this.values.getStandardLength()
      const start = target.selectionStart || 0
      const end = target.selectionEnd || 0

      if (start > length) {
        target.selectionStart = length
      }

      if (end > length) {
        target.selectionEnd = length
      }
    }
  }
}
