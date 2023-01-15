import { computed, ref, watch } from 'vue'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { GeoDate } from '../../classes/GeoDate'
import { GeoIntl } from '../../classes/GeoIntl'
import { MaskRubberTransition } from './MaskRubberTransition'
import { forEach, getExp, isFilled, isSelected, strFill } from '../../functions'
import { props } from './props'
import { AssociativeType } from '../types'
import {
  MaskClassesType,
  MaskImmediateType,
  MaskItemsType,
  MaskItemType,
  MaskPatternType,
  MaskPatternTypeType,
  MaskSetupType,
  MaskSpecialItemType,
  MaskValidationType,
  MaskViewType
} from './types'

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

  // DELETE
  protected readonly rubberItems = ref<AssociativeType<number>>({})

  // DELETE
  protected readonly transition: MaskRubberTransition

  protected selection = {
    start: 0 as number,
    end: 0 as number
  }

  protected selectionCharacter = 0 as number

  protected change?: boolean
  protected unidentified?: boolean

  constructor (
    protected readonly props: AssociativeType & object,
    protected readonly context: AssociativeType & object
  ) {
    super(props, context)

    this.transition = new MaskRubberTransition()

    watch(this.refs.value, value => this.newValue(value))
    watch(this.character, value => {
      this.length.value = value.length
    })

    watch(this.mask, () => this.goSelection())

    watch([
      this.ifFull,
      this.validationMessage,
      this.value
    ], () => {
      this.change = true
      this.on()
    })

    this.newValue(this.props.value)
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
      standardByRight: this.standardByRight,
      validation: this.validation,
      validationMessage: this.validationMessage,
      maskBind: this.mask,
      valueBind: this.value,
      viewBind: this.view,
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

  // DELETE
  protected decimal = computed<string | string[] | undefined>(() => {
    const data = this.geoIntl.value.numberDecimal().value

    return this.mask.value.indexOf(data) !== -1 ? [data, '.'] : undefined
  })

  protected geo = computed<GeoDate | undefined>(() => {
    return this.ifDate.value ? new GeoDate('1987-12-18T10:20:30', this.props.type) : undefined
  })

  // DELETE
  protected geoIntl = computed<GeoIntl>(() => new GeoIntl())

  protected ifDate = computed<boolean>(() => ['text', 'number', 'currency'].indexOf(this.props.type) === -1)

  protected ifFull = computed<boolean>(() => {
    let empty = false

    forEach(this.valueByType.value, item => {
      if (!item.full) {
        empty = true
      }
    })

    return !empty
  })

  protected ifRight = computed(() => ['number', 'currency'].indexOf(this.props.type) !== -1 || this.props.right)

  protected mask = computed<string[]>(() => {
    switch (this.props.type) {
      case 'currency':
        return this.rubberByCurrency.value
          .replace(/9/ig, 'n')
          .replace(/8/ig, 'f')
          .split('')
      case 'number':
        return this.rubberByNumber.value
          .replace(/9/ig, 'n')
          .replace(/8/ig, 'f')
          .split('')
      default:
        if (this.geo.value) {
          return this.geo.value.locale('numeric').value
            .replace('1987', 'YYYY')
            .replace('12', 'MM')
            .replace('18', 'DD')
            .replace('10', 'hh')
            .replace('20', 'mm')
            .replace('30', 'ss')
            .split('')
        } else {
          return this.maskBasic.value
        }
    }
  })

  protected maskBasic = computed<string[]>(() => {
    let mask = this.props.mask

    if (Array.isArray(mask)) {
      mask = mask.find(
        (item, key) => this.getSpecialLength(item) >= this.length.value || key === mask.length - 1
      )
    }

    return this.getRubber(mask).split('') || []
  })

  protected maxLength = computed<number>(() => {
    if (
      this.ifDate.value ||
      !Array.isArray(this.props.mask)
    ) {
      return this.mask.value.length
    } else {
      let length = 0;

      (this.props.mask as string[]).forEach(item => {
        if (item.length > length) {
          length = item.length
        }
      })

      return length
    }
  })

  // DELETE
  protected rubber = computed<AssociativeType<MaskSpecialItemType> | undefined>(() => {
    const rubber = {} as AssociativeType<MaskSpecialItemType>
    let isRubber = false

    switch (this.props.type) {
      case 'currency':
      case 'number':
        rubber.n = {
          rubber: true,
          transitionChar: this.decimal.value,
          maxLength: 12
        }
        rubber.f = {
          rubber: this.props.fraction === true,
          maxLength: 6
        }

        isRubber = true

        break
      default:
        if (typeof this.props.special === 'object') {
          forEach<MaskSpecialItemType, string, void>(this.props.special, (item, index) => {
            if (item?.rubber) {
              rubber[index] = item
              isRubber = true
            }
          })
        }

        break
    }

    return isRubber ? rubber : undefined
  })

  // DELETE
  protected rubberByItem = computed<string>(() => {
    const rubberItems = this.rubberItems.value
    const number = strFill('9', (rubberItems?.n || 0) + 1)
    const fraction = this.props.type === 'currency'
      ? 2
      : rubberItems?.f ? rubberItems.f + 1 : this.props.fraction || 0

    return `${number}${fraction ? `.${strFill('8', fraction)}` : ''}${this.props.type === 'currency' ? ` ${this.props.currency}` : ''}`
  })

  // DELETE
  protected rubberByCurrency = this.geoIntl.value.currency(this.rubberByItem, { maximumFractionDigits: 2 })
  protected rubberByNumber = this.geoIntl.value.number(this.rubberByItem, { maximumFractionDigits: 9 })

  protected pattern = computed<MaskPatternType>(() => {
    if (this.geo.value) {
      return {
        Y: '[0-9]{4}',
        M: {
          max: '12',
          min: '1',
          type: 'number'
        },
        D: (value: MaskItemsType): AssociativeType<string> => {
          const date = new GeoDate(`${value?.Y?.value || '2000'}-${value?.M?.value || '01'}-01`)

          return {
            max: date.getMaxDay().value.toString(),
            min: '1',
            type: 'number'
          }
        },
        h: {
          max: '23',
          min: '0',
          type: 'number'
        },
        m: {
          max: '59',
          min: '0',
          type: 'number'
        },
        s: {
          max: '59',
          min: '0',
          type: 'number'
        },
        ...this.props.pattern
      }
    } else if (
      typeof this.props.special === 'string' &&
      ['function', 'string'].indexOf(typeof this.props.pattern) !== -1
    ) {
      return {
        [this.props.special]: this.props.pattern
      }
    } else {
      return this.props.pattern || {}
    }
  })

  protected special = computed<string[] | string>(() => {
    switch (this.props.type) {
      case 'currency':
      case 'number':
        return ['n', 'f']
      default:
        if (this.geo.value) {
          return ['Y', 'M', 'D', 'h', 'm', 's']
        } else if (typeof this.props.special === 'object') {
          return Object.keys(this.props.special)
        } else {
          return this.props.special
        }
    }
  })

  protected standard = computed<string>(() => {
    const character = this.character.value
    const rubber = this.rubber.value
    const value = [] as string[]

    let stop: boolean
    let key = 0 as number

    this.mask.value.forEach(char => {
      if (!stop) {
        if (!this.ifSpecial(char)) {
          value.push(char)
        } else if (key in character) {
          value.push(character[key++])

          if (
            rubber &&
            char in rubber &&
            key >= character.length &&
            this.transition.disabled(char)
          ) {
            stop = true
          }
        } else {
          stop = true
        }
      }
    })

    return value.join('')
  })

  protected standardByRight = computed<string>(() => {
    if (this.ifRight.value) {
      let data = ''

      this.view.value?.forEach(item => {
        data += item.value
      })

      return data
    } else {
      return this.standard.value
    }
  })

  protected transitionChar = computed<string[]>(() => {
    const data = [] as string[]

    if (this.rubber.value) {
      forEach(this.rubber.value, item => {
        if (item?.transitionChar) {
          if (typeof item.transitionChar === 'string') {
            data.push(item.transitionChar)
          } else {
            data.push(...item.transitionChar)
          }
        }
      })
    }

    return data
  })

  protected validation = computed<MaskValidationType | undefined>(() => {
    let validation: MaskValidationType | undefined

    forEach<MaskPatternType, string, void>(this.pattern.value, (item, index) => {
      if (!validation && index in this.valueByType.value) {
        const valueByType = this.valueByType.value[index]

        if (valueByType.full) {
          const check = this.check(valueByType)

          if (!check.status) {
            validation = check
          }
        }
      }
    })

    return validation || this.validationCheck.value
  })

  protected validationCheck = computed<MaskValidationType | undefined>(() => {
    let validation: MaskValidationType | undefined

    if (this.ifFull.value && 'check' in this.pattern.value) {
      const check = this.check(this.valueByItem.value)

      if (!check.status) {
        validation = check
      }
    }

    return validation
  })

  protected validationMessage = computed<string>(() => this.validation.value?.validationMessage || '')

  protected value = computed<string>(() => {
    if (this.validation.value) {
      return ''
    } else {
      switch (this.props.type) {
        case 'number':
          return this.getValueByNumber()
        default:
          if (this.ifDate.value) {
            return this.getValueByDate()
          } else {
            return this.standard.value
          }
      }
    }
  })

  protected valueByItem = computed<MaskItemType>(() => {
    return {
      index: 'check',
      value: this.value.value,
      maxLength: this.value.value.length,
      full: true,
      chars: this.value.value.split('')
    }
  })

  protected valueByType = computed<MaskItemsType>(() => {
    const data = {} as MaskItemsType
    const special = this.special.value
    const standard = this.standard.value

    this.mask.value.forEach((char, index) => {
      if (isSelected(char, special)) {
        const value = this.addValueByType(data, char)

        if (standard[index] !== undefined) {
          value.chars.push(standard[index])
        }

        value.maxLength++
        value.full = value.maxLength === value.chars.length
        value.value = value.full ? value.chars.join('') : ''
      }
    })

    return data
  })

  protected view = computed<MaskViewType[]>(() => {
    const data = [] as MaskViewType[]

    this.mask.value.forEach((item, index) => {
      data.push({
        type: `${this.getClassName(['character'])} ${this.getViewType(item, index)}`,
        value: this.getViewValue(item, index)
      })
    })

    return data
  })

  protected addValueByType (data: MaskItemsType, index: string): MaskItemType {
    if (!(index in data)) {
      data[index] = {
        index,
        maxLength: 0,
        full: false,
        chars: [],
        value: ''
      }
    }

    return data[index]
  }

  cancel (): this {
    this.character.value = []
    return this
  }

  protected characterToValue (selection: number, mask?: string[]): number {
    const maskValue = mask || this.mask.value
    let selectionChar = -1 as number
    let value: number | undefined

    maskValue.forEach((char, index) => {
      if (this.ifSpecial(char)) {
        selectionChar++
      }

      if (value === undefined && selectionChar >= selection) {
        value = index
      }
    })

    return value !== undefined ? value : maskValue.length
  }

  protected check (item: MaskItemType): MaskValidationType {
    const pattern = this.pattern.value[item.index]
    const input = this.getInput(this.getInputAttributes(pattern))

    input.value = item.value

    return {
      index: item.index,
      input,
      status: input?.checkValidity(),
      validationMessage: input.validationMessage,
      validity: input.validity,
      pattern
    }
  }

  protected getCharacter (text: string): string[] {
    const value = [] as string[]

    text.split('').forEach(char => {
      if (this.ifMatch(char)) {
        value.push(char)
      }
    })

    return value
  }

  protected async getClipboardData (event: ClipboardEvent): Promise<string> {
    return event?.clipboardData?.getData('text') || await navigator.clipboard.readText() || ''
  }

  protected getInput (attributes: AssociativeType<string>): HTMLInputElement {
    const input = document.createElement('input')

    forEach<string, string, void>(attributes, (item, name) => {
      input.setAttribute(name, item)
    })

    return input
  }

  protected getInputAttributes (pattern: MaskPatternTypeType): AssociativeType<string> {
    const attributes = {} as AssociativeType<string>

    if (isFilled(pattern)) {
      switch (typeof pattern) {
        case 'function':
          Object.assign(attributes, this.getInputFunctionAttributes(pattern))
          break
        case 'string':
          attributes.pattern = pattern
          break
        case 'object':
          Object.assign(attributes, pattern)

          break
      }
    }

    return attributes
  }

  protected getInputFunctionAttributes (
    callback: (value: MaskItemsType) => string | AssociativeType<string>
  ): AssociativeType<string> {
    const read = callback(this.valueByType.value)

    if (typeof read === 'string') {
      return { pattern: read }
    } else {
      return read
    }
  }

  protected getMaskChar (selection: number): string {
    return this.mask.value?.[selection]
  }

  // DELETE
  protected getRubber (mask?: string): string {
    let value = mask?.toString() || ''

    forEach<number, string, void>(this.rubberItems.value, (rubber, index) => {
      value = value.replace(getExp(index, 'ig', '([:value]+)'), (all: string) => {
        return `${all}${strFill(index, rubber)}`
      })
    })

    return value
  }

  protected getPatternImmediate (selection: number): MaskImmediateType {
    const wait = this.getMaskChar(selection)

    if (this.ifSpecial(wait)) {
      return {
        special: wait,
        newSelection: selection
      }
    } else if (selection > 0) {
      return this.getPatternImmediate(selection - 1)
    } else {
      return {
        special: '',
        newSelection: 0
      }
    }
  }

  protected getSpecialLength (mask?: string): number {
    let value = 0 as number

    mask?.split('').forEach(char => {
      if (this.ifSpecial(char)) {
        value++
      }
    })
    return value
  }

  protected goSelection (selection?: number): this {
    const selectionChar = typeof selection === 'number'
      ? selection
      : this.selectionCharacter < 0
        ? this.selectionCharacter
        : this.characterToValue(this.selectionCharacter)

    requestAnimationFrame(() => {
      if (this.element.value) {
        this.element.value.selectionEnd = selectionChar + 1
        this.element.value.selectionStart = selectionChar + 1
        // this.toEnd(this.element.value)
      }
    })

    return this
  }

  protected getValueByDate (): string {
    const date = this.valueByType.value

    const value = `${date?.Y?.value || '2000'}` +
      `-${date?.M?.value || '01'}` +
      `-${date?.D?.value || '01'}` +
      `T${date?.h?.value || '00'}` +
      `:${date?.m?.value || '00'}` +
      `:${date?.s?.value || '00'}`

    return new GeoDate(value, this.props.type).standard(false).value
  }

  protected getValueByNumber (): string {
    const data = this.valueByType.value
    const fraction = data?.f?.value

    return `${data?.n?.value}${fraction ? `.${fraction}` : ''}`
  }

  protected getViewType (item: string, index: number): string {
    if (this.standard.value.length > index) {
      if (!this.ifSpecial(item)) {
        return 'is-standard'
      } else if (this.validation.value?.index === item) {
        return 'is-error'
      } else {
        return 'is-special'
      }
    } else {
      return `is-placeholder${this.transitionChar.value.indexOf(item) !== -1 ? ' is-transition' : ''}`
    }
  }

  protected getViewValue (item: string, index: number): string {
    if (this.standard.value.length > index) {
      return this.standard.value[index]
    } else if (this.ifSpecial(item)) {
      const view = this.props.view

      switch (typeof view) {
        case 'string':
          return view
        case 'object':
          if (item in view) {
            return view[item]
          }
      }
    }

    return item
  }

  protected ifMatch (char: string): boolean {
    return !!char.toString().match(this.props.match)
  }

  protected ifSpecial (char: string): boolean {
    return isSelected(char, this.special.value)
  }

  newValue (value: string): this {
    this.reset(value)
    return this
  }

  on (type = 'on-input') {
    this.context.emit(type, {
      checkValidity: this.validation.value === undefined,
      required: this.ifFull.value,
      validation: this.validation.value,
      validationMessage: this.validationMessage.value,
      value: this.value.value
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

      if (this.selection.start !== this.selection.end) {
        this.popValueList(this.selection.start, this.selection.end)
      }

      if (event.data) {
        if (!this.setValue(this.selection.start, event.data)) {
          target.value = this.standard.value
          requestAnimationFrame(() => this.goSelection())
        }
      } else if (
        this.length.value > target.value.length &&
        this.selection.start === this.selection.end
      ) {
        this.popValue(this.selection.start)
      }
    }
  }

  onKeydown (event: KeyboardEvent): void {
    const target = event.target as HTMLInputElement

    if (event.key === 'Unidentified' || event.keyCode === 229) {
      this.unidentified = true
      this.length.value = target.value.length
      this.selection.start = target.selectionStart || 0
      this.selection.end = target.selectionEnd || 0
    } else if (event.key === 'Backspace' || event.keyCode === 8) {
      event.preventDefault()

      if (target.selectionStart !== null) {
        if (target.selectionStart === target.selectionEnd) {
          this.popValue(target.selectionStart)
        } else if (target.selectionEnd !== null) {
          this.popValueList(target.selectionStart, target.selectionEnd)
        }
      }
    }
  }

  onKeypress (event: KeyboardEvent): void {
    const target = event.target as HTMLInputElement

    if (target.selectionStart !== null) {
      if (target.selectionStart === target.selectionEnd) {
        this.setValue(target.selectionStart, event.key)
      } else if (target.selectionEnd !== null) {
        this.popValueList(target.selectionStart, target.selectionEnd)
        console.log(this.selectionCharacter)
        this.setValue(target.selectionStart, event.key)
      }
    }
  }

  async onPaste (event: ClipboardEvent): Promise<void> {
    const target = event.target as HTMLInputElement
    const start = target.selectionStart as number

    if (
      target.selectionEnd !== null &&
      start !== target.selectionEnd
    ) {
      this.popValueList(start, target.selectionEnd)
    }

    this.pasteValue(start, await this.getClipboardData(event))
  }

  pasteValue = (
    selection: number,
    value: string,
    focus = true as boolean
  ): this => {
    let index = this.valueToCharacter(selection)

    if (index === -1) {
      index = 0
    }

    index = this.characterToValue(index++)
    value.split('').forEach(char => {
      index = this.setValue(index, char, focus) || index
    })

    return this
  }

  protected popCharacter (selection: number): this {
    this.character.value.splice(selection, 1)
    this.selectionCharacter = selection - 1

    return this
  }

  // DELETE
  protected popRubber (special: string): this {
    const rubber = this.rubberItems.value

    if (special in rubber) {
      if (rubber[special] > 0) {
        rubber[special]--
      }

      if (rubber[special] === 0) {
        delete rubber[special]
      }
    }

    this.transition.reset()
    return this
  }

  popValue (selection: number, go = true): string {
    const index = selection - 1
    const char = this.getMaskChar(index)

    if (
      selection > 0 &&
      this.maxLength.value >= selection && (
        go ||
        this.ifSpecial(char)
      )
    ) {
      const selectionChar = this.valueToCharacter(index)
      this.popCharacter(selectionChar)

      if (go) {
        this.popRubber(char)
        this.goSelection()
      }

      this.shiftCharacter(0)
      return char
    }

    return ''
  }

  popValueList (selectionStart: number, selectionEnd: number): this {
    const chars = []

    for (let i = selectionEnd; i > selectionStart; i--) {
      chars.push(this.popValue(i, false))
    }

    chars.forEach(char => {
      if (char !== '') {
        this.popRubber(char)
      }
    })

    return this
  }

  protected reset (value: string): string[] {
    const data = [] as string[]

    if (value) {
      if (this.props.paste) {
        data.push(...this.getCharacter(value))
      } else {
        const chars = this.ifDate.value
          ? new GeoDate(value, this.props.type).locale().value
          : value

        this.character.value = []
        this.pasteValue(0, chars, false)
      }
    }

    return data
  }

  protected setCharacter (selection: number, char: string): this {
    this.character.value.splice(selection, 0, char)
    this.selectionCharacter = selection

    return this
  }

  // DELETE
  protected setRubber (selection: number, char: string): number {
    if (this.rubber.value) {
      const {
        special,
        newSelection
      } = this.getPatternImmediate(selection)

      const wait = this.getMaskChar(selection)
      const rubber = this.rubber.value?.[special]
      const valueByType = this.valueByType.value?.[special]

      if (rubber && rubber.rubber) {
        if (
          isSelected(char, rubber?.transitionChar) || (
            rubber?.maxLength &&
            rubber?.maxLength <= valueByType?.maxLength
          )
        ) {
          this.transition.set(special)
        } else if (
          valueByType.full &&
          this.ifMatch(char) && (
            this.transition.disabled(special) ||
            wait === special
          )
        ) {
          const character = this.valueToCharacter(newSelection)

          if (special in this.rubberItems.value) {
            this.rubberItems.value[special]++
          } else {
            this.rubberItems.value[special] = 1
          }

          return wait !== special
            ? this.characterToValue(character + 1)
            : this.characterToValue(character)
        }
      }
    }

    return selection
  }

  setValue (
    selection: number,
    char: string,
    focus = true as boolean
  ): number {
    const rubber = this.setRubber(selection, char)

    if (this.ifMatch(char)) {
      this.shiftCharacter()

      const selectionChar = this.valueToCharacter(rubber)
      const wait = this.getMaskChar(rubber)

      if (
        wait &&
        this.maxLength.value > this.standard.value.length
      ) {
        if (this.ifSpecial(wait)) {
          this.setCharacter(selectionChar, char)

          if (focus) {
            this.goSelection()
          }

          this.transition.reset()
          return this.characterToValue(selectionChar) + 1
        } else {
          return this.setValue(rubber + 1, char)
        }
      }
    }

    return 0
  }

  protected shiftCharacter (status = 1): this {
    this.length.value = this.character.value.length + status
    return this
  }

  protected toEnd (target: HTMLInputElement): void {
    if (
      this.ifRight.value &&
      target.selectionStart !== null &&
      target.selectionStart > this.standard.value.length
    ) {
      target.selectionStart = this.standard.value.length
      target.selectionEnd = this.standard.value.length
    }
  }

  protected valueToCharacter (selection: number, mask?: string[]): number {
    let value = -1;

    (mask || this.mask.value).forEach((char, index) => {
      if (index <= selection && this.ifSpecial(char)) {
        value++
      }
    })

    return value
  }
}
