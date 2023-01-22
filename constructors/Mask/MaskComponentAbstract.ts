import { computed, ref } from 'vue'
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
import { props } from './props'
import { ArrayOrStringType, AssociativeType } from '../types'
import { MaskClassesType, MaskItemsType, MaskSetupType } from './types'

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

  protected focus = false as boolean
  protected selectionCounter?: number

  // DELETE
  protected readonly length = ref<number>(0)

  protected unidentified?: boolean
  protected unidentifiedSelection = {
    start: 0 as number,
    end: 0 as number
  }

  protected change?: boolean

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
      this.character
    )
    this.selection = new MaskSelection(this.item, this.special)
    this.characters = new MaskCharacter(
      this.item,
      this.selection,
      this.character
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
      this.special,
      this.rubbers,
      this.item,
      this.values,
      this.validation,
      this.refs.view,
      this.getClassName(['character'])
    )

    /*
    watch(this.refs.value, value => this.newValue(value))

    watch(this.mask, () => this.goSelection())

    watch([
      this.ifFull,
      this.validationMessage,
      this.deleteValue
    ], () => {
      this.change = true
      this.on()
    })

    this.newValue(this.props.value)
    */
  }

  setup (): MaskSetupType {
    const classes = this.getClasses<MaskClassesType>({
      main: { 'is-right': this.isRight }
    })
    const styles = this.getStyles()

    return {
      ...this.getBasic(),
      classes,
      styles,
      charsElement: this.charsElement,
      standard: this.standard,
      standardByRight: this.standard,
      validation: this.validation.item,
      validationMessage: this.validation.message,
      maskBind: this.item.activeMask,
      valueBind: this.values.item,
      viewBind: this.view.item,
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

  cancel (): this {
    this.character.value = []
    return this
  }

  protected async getClipboardData (event: ClipboardEvent): Promise<string> {
    return event?.clipboardData?.getData('text') || await navigator.clipboard.readText() || ''
  }

  protected goSelection (): this {
    if (this.focus) {
      if (this.selectionCounter) {
        cancelAnimationFrame(this.selectionCounter)
      }

      this.selectionCounter = requestAnimationFrame(() => {
        this.selectionCounter = undefined
        if (this.element.value) {
          this.element.value.selectionEnd = this.selection.getShift()
          this.element.value.selectionStart = this.selection.getShift()
        }
      })
    }

    return this
  }

  newValue (value: string): this {
    this.reset(value)
    return this
  }

  on (type = 'on-input') {
    this.context.emit(type, {
      // checkValidity: this.validation.value === undefined,
      // required: this.ifFull.value,
      // validation: this.validation.value,
      // validationMessage: this.validationMessage.value,
      // value: this.deleteValue.value
    })
  }

  onBlur (event: FocusEvent): void {
    if (this.change) {
      this.on('on-change')
    }

    this.focus = false
    this.change = false
    this.context.emit('on-blur', event)
  }

  onChange (event: Event): void {
    const target = event.target as HTMLInputElement
    this.newValue(target.value)
  }

  onClick (event: MouseEvent): void {
    this.toEnd(event.target as HTMLInputElement)
  }

  onFocus (event: FocusEvent): void {
    this.focus = true
    this.change = false
    this.context.emit('on-focus', event)
    this.toEnd(event.target as HTMLInputElement)
  }

  onInput (event: InputEvent) {
    if (this.unidentified) {
      const target = event.target as HTMLInputElement
      this.unidentified = false

      if (this.unidentifiedSelection.start !== this.unidentifiedSelection.end) {
        this.pop(this.unidentifiedSelection.start, this.unidentifiedSelection.end)
      }

      if (event.data) {
        if (!this.set(this.unidentifiedSelection.start, event.data)) {
          target.value = this.standard.value
          requestAnimationFrame(() => this.goSelection())
        }
      } else if (
        this.length.value > target.value.length &&
        this.unidentifiedSelection.start === this.unidentifiedSelection.end
      ) {
        this.pop(this.unidentifiedSelection.start)
      }
    }
  }

  onKeydown (event: KeyboardEvent): void {
    const target = event.target as HTMLInputElement
    const start = target.selectionStart || 0
    const end = target.selectionEnd || 0

    if (event.key === 'Unidentified' || event.keyCode === 229) {
      this.unidentified = true
      this.length.value = target.value.length
      this.unidentifiedSelection.start = start
      this.unidentifiedSelection.end = end
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
    const start = target.selectionStart as number

    if (
      target.selectionEnd !== null &&
      start !== target.selectionEnd
    ) {
      // this.pops(start, target.selectionEnd)
    }

    // this.pasteValue(start, await this.getClipboardData(event))
  }

  pasteValue = (
    // selection: number,
    // value: string,
    // focus = true as boolean
  ): this => {
    /*
    let index = this.valueToCharacter(selection)

    if (index === -1) {
      index = 0
    }

    index = this.characterToValue(index++)
    value.split('').forEach(char => {
      index = this.set(index, char, focus) || index
    })
    */

    return this
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

  reset (value: string): this {
    if (value) {
      // const chars = this.type.isDate() ? this.date.getLocale(value) : value

      this.characters.reset()
      // this.pasteValue(0, chars, false)
    }

    return this
  }

  set (
    selection: number,
    chars: ArrayOrStringType,
    focus = true as boolean
  ): this {
    this.selection.setByMask(selection, focus)

    To.array(chars).forEach(char => {
      this.transition.reset()
      this.selection.setShift(
        this.rubbers.set(this.characters.getImmediate(), char)
      )

      if (this.match.isMatch(char)) {
        this.characters.shift()

        if (
          this.characters.getFocus() &&
          this.item.getMaxLength() > this.values.getStandardLength()
        ) {
          this.characters.set(char)
        }
      } else if (this.transition.is()) {
        this.selection.setByMask(this.item.getByChar(this.transition.get(), this.selection.getImmediate()) + 1, focus)
      }
    })

    this.goSelection()
    return this
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
