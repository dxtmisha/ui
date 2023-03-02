import { computed, ref, watch } from 'vue'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { MaskCharacter } from './MaskCharacter'
import { MaskDate } from './MaskDate'
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
import { To } from '../../classes/To'
import { getClipboardData } from '../../functions'
import { props } from './props'

import { ArrayOrStringType, AssociativeType, ValidationType } from '../types'
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

  protected change?: boolean
  protected focus = false as boolean
  protected isReset?: boolean

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

    watch(this.refs.value, value => this.reset(value))
    watch([
      this.validation.item,
      this.values.full,
      this.values.value
    ], () => {
      if (this.isReset) {
        this.isReset = false
      } else {
        this.change = true
        this.on()
      }
    })

    this.reset(this.props.value)
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

      reset: (value = '' as string) => this.reset(value),
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

  protected goSelection (): this {
    if (this.focus) {
      requestAnimationFrame(() => {
        if (this.element.value) {
          this.element.value.selectionEnd = this.selection.getShift()
          this.element.value.selectionStart = this.selection.getShift()
        }
      })
    }

    return this
  }

  on (type = 'on-input') {
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

  onBlur (event: FocusEvent): void {
    if (this.change) {
      this.on('on-change')
    }

    this.focus = false
    this.context.emit('on-blur', event)
  }

  onChange (event: Event): void {
    this.reset((event.target as HTMLInputElement).value)
  }

  onClick (event: MouseEvent): void {
    this.toEnd(event.target as HTMLInputElement)
  }

  onFocus (event: FocusEvent): void {
    this.focus = true
    this.change = false
    this.context.emit('on-focus', event)
  }

  onInput (event: InputEvent) {
    if (this.unidentified) {
      const target = event.target as HTMLInputElement

      if (
        this.unidentified.length > target.value.length ||
        this.unidentified.start !== this.unidentified.end
      ) {
        this.pop(this.unidentified.start, this.unidentified.end)
      }

      if (event.data) {
        this.set(this.unidentified.start, event.data)
        target.value = this.standard.value
        requestAnimationFrame(() => this.goSelection())
      }

      this.unidentified = undefined
    }
  }

  onKeydown (event: KeyboardEvent): void {
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
      this.pop(start, end)
    }
  }

  onKeypress (event: KeyboardEvent): void {
    const target = event.target as HTMLInputElement
    const start = target.selectionStart || 0
    const end = target.selectionEnd || 0

    if (start === end) {
      this.set(start, event.key)
    } else {
      this.pop(start, end)
        .set(this.selection.getShift(), event.key)
    }
  }

  async onPaste (event: ClipboardEvent): Promise<void> {
    const target = event.target as HTMLInputElement
    const start = target.selectionStart || 0
    const end = target.selectionEnd || 0
    const text = (await getClipboardData(event)).split('')

    if (start === end) {
      this.set(start, text)
    } else {
      this.pop(start, end)
        .set(this.selection.getShift(), text)
    }
  }

  pop (
    start: number,
    end = start as number,
    focus = true as boolean
  ): this {
    if (
      start >= 0 &&
      end <= this.item.getMaxLength()
    ) {
      let quantity = this.item.getSpecialQuantity(start, end)

      if (focus) {
        this.selection.setByMask(end)
      }

      while (quantity--) {
        this.transition.reset()

        this.characters.pop()
        this.characters.shift(0)

        this.selection.setShift(
          this.rubbers.pop(this.characters.getFocus())
        )
      }

      this.goSelection()
    }

    return this
  }

  reset (value = '' as string): this {
    this.isReset = true
    this.characters.reset()

    if (value) {
      const chars = this.type.isDate() ? this.date.getLocale(value) : value
      this.set(0, chars.split(''))
    }

    return this
  }

  set (
    selection: number,
    chars: ArrayOrStringType,
    focus = true as boolean
  ): boolean {
    let update = false as boolean

    this.selection.setByMask(selection, focus)
    this.transition.reset()

    To.array(chars).forEach(char => {
      const immediate = this.characters.getImmediate()

      this.selection.setShift(
        this.rubbers.set(immediate, char)
      )

      if (this.match.isMatch(char, immediate)) {
        this.characters.shift()

        if (
          this.characters.getFocus() &&
          this.item.getMaxLength() > this.values.getStandardLength()
        ) {
          this.characters.set(char)
          update = true
        }
      } else if (this.transition.is()) {
        this.selection.setByMask(this.item.getByChar(this.transition.get(), this.selection.getImmediate()) + 1, focus)
      }
    })

    this.goSelection()
    return update
  }

  protected toEnd (target: HTMLInputElement): void {
    if (this.isRight.value) {
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
