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
import { props } from './props'
import { AssociativeType } from '../types'
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

  // DELETE
  protected readonly length = ref<number>(0)

  protected deleteSelection = {
    start: 0 as number,
    end: 0 as number
  }

  protected change?: boolean
  protected unidentified?: boolean

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
      main: { 'is-right': false }
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

  protected goSelection (focus = true as boolean): this {
    if (focus) {
      requestAnimationFrame(() => {
        if (this.element.value) {
          this.element.value.selectionEnd = this.selection.getFocus()
          this.element.value.selectionStart = this.selection.getFocus()
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
    this.change = false
    this.context.emit('on-focus', event)

    requestAnimationFrame(() => this.toEnd(event.target as HTMLInputElement))
  }

  onInput (event: InputEvent) {
    if (this.unidentified) {
      const target = event.target as HTMLInputElement
      this.unidentified = false

      if (this.deleteSelection.start !== this.deleteSelection.end) {
        this.popByList(this.deleteSelection.start, this.deleteSelection.end)
      }

      if (event.data) {
        if (!this.set(this.deleteSelection.start, event.data)) {
          target.value = this.standard.value
          requestAnimationFrame(() => this.goSelection())
        }
      } else if (
        this.length.value > target.value.length &&
        this.deleteSelection.start === this.deleteSelection.end
      ) {
        this.pop(this.deleteSelection.start)
      }
    }
  }

  onKeydown (event: KeyboardEvent): void {
    const target = event.target as HTMLInputElement

    if (event.key === 'Unidentified' || event.keyCode === 229) {
      this.unidentified = true
      this.length.value = target.value.length
      this.deleteSelection.start = target.selectionStart || 0
      this.deleteSelection.end = target.selectionEnd || 0
    } else if (event.key === 'Backspace' || event.keyCode === 8) {
      event.preventDefault()

      if (target.selectionStart !== null) {
        if (target.selectionStart === target.selectionEnd) {
          this.pop(target.selectionStart)
        } else if (target.selectionEnd !== null) {
          this.popByList(target.selectionStart, target.selectionEnd)
        }
      }
    }
  }

  onKeypress (event: KeyboardEvent): void {
    const target = event.target as HTMLInputElement
    const start = target.selectionStart || 0
    const end = target.selectionEnd || 0

    if (start === end) {
      this.set(start, event.key)
    } else {
      this.popByList(start, end)
      this.set(start, event.key)
    }
  }

  async onPaste (event: ClipboardEvent): Promise<void> {
    const target = event.target as HTMLInputElement
    const start = target.selectionStart as number

    if (
      target.selectionEnd !== null &&
      start !== target.selectionEnd
    ) {
      this.popByList(start, target.selectionEnd)
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
    selection: number,
    focus = true as boolean
  ): boolean {
    if (
      selection > 0 &&
      this.item.getMaxLength() >= selection
    ) {
      this.rubber.pop(this.characters.getFocus())
      this.characters.pop()
      this.characters.shift(0)
      this.transition.reset()

      this.goSelection(focus)
      return true
    }

    return false
  }

  popByList (start: number, end: number): this {
    for (let i = end; i > start; i--) {
      this.pop(i, false)
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
    char: string,
    focus = true as boolean
  ): boolean {
    this.selection.setByMask(selection)
    // console.log('this.selection', this.selection.get())
    // console.log('this.characters.getFocus', this.characters.getFocus())
    this.rubbers.set(this.characters.getFocus(), char)
    // console.log('this.rubbers', this.rubbers.get())
    // console.log('this.match.isMatch', char, this.match.isMatch(char))

    if (this.match.isMatch(char)) {
      this.characters.shift()
      // console.log('this.characters.getFocus', this.characters.getFocus())
      console.log('this.values.getStandardLength', this.values.getStandardLength())
      console.log('this.item.getMaxLength', this.item.getMaxLength())

      if (
        this.characters.getFocus() &&
        this.item.getMaxLength() > this.values.getStandardLength()
      ) {
        this.characters.set(char)
        this.transition.reset()

        this.goSelection(focus)
        return true
      }
    }

    return false
  }

  protected toEnd (target: HTMLInputElement): void {
    if (
      this.isRight.value &&
      target.selectionStart !== null &&
      target.selectionStart > this.standard.value.length
    ) {
      target.selectionStart = this.standard.value.length
      target.selectionEnd = this.standard.value.length
    }
  }
}
