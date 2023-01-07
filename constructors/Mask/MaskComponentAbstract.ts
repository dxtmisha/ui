import { computed, ComputedRef, Ref, ref, watch } from 'vue'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { props } from './props'
import { ArrayOrStringType, AssociativeType, ComponentBaseType } from '../types'
import { GeoDate } from '../../classes/GeoDate'
import { isSelected } from '../../functions'

export type MaskSetupType = ComponentBaseType & {
  charsElement: Ref<HTMLSpanElement | undefined>
  dateElement: Ref<HTMLInputElement | undefined>
  standard: ComputedRef<string>
  onInput: (event: InputEvent) => void
  onKeydown: (event: KeyboardEvent) => void
  onKeypress: (event: KeyboardEvent) => void
}

export abstract class MaskComponentAbstract extends ComponentAbstract<HTMLInputElement> {
  static readonly instruction = props as AssociativeType
  static readonly emits = [
    'on-change',
    'on-blur',
    'on-focus',
    'on-input'
  ] as string[]

  protected readonly charsElement = ref<HTMLSpanElement | undefined>()
  protected readonly dateElement = ref<HTMLInputElement | undefined>()

  protected readonly character = ref<string[]>([])

  protected selection = {
    start: null as number | null,
    end: null as number | null
  }

  protected length = 0 as number
  protected unidentified?: boolean

  constructor (
    protected readonly props: AssociativeType & object,
    protected readonly context: AssociativeType & object
  ) {
    super(props, context)

    watch(this.refs.value, value => this.reset(value))
    this.reset(this.props.value)
  }

  setup (): MaskSetupType {
    const classes = this.getClasses()
    const styles = this.getStyles()

    return {
      ...this.getBasic(),
      classes,
      styles,
      charsElement: this.charsElement,
      dateElement: this.dateElement,
      standard: this.standard,
      onInput: (event: InputEvent) => this.onInput(event),
      onKeydown: (event: KeyboardEvent) => this.onKeydown(event),
      onKeypress: (event: KeyboardEvent) => this.onKeypress(event)
    }
  }

  protected geo = computed<GeoDate | undefined>(() => {
    return this.ifDate.value ? new GeoDate('1987-12-18T10:20:30', this.props.type) : undefined
  })

  protected ifDate = computed<boolean>(() => this.props.type !== 'text')

  protected mask = computed<string[]>(() => {
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
  })

  protected maskBasic = computed<string[]>(() => {
    let mask = this.props.mask

    if (Array.isArray(mask)) {
      mask = mask.find(
        (item, key) => this.getSpecialLength(item) >= this.length || key === mask.length - 1
      )
    }

    return mask?.toString().split('') || []
  })

  protected maxLength = computed<number>(() => {
    if (
      this.ifDate ||
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

  protected pattern = computed<ArrayOrStringType>(() => {
    if (this.geo.value) {
      return {
        Y: '[0-9]{4}',
        M: '01|02|03|04|05|06|07|08|09|10|11|12',
        d: (value: AssociativeType<string>): string => {
          const date = new GeoDate(`${value?.y || '2000'}-${value?.m || '01'}-01`).getMaxDay().value
          const days = []

          for (let i = 1; i <= date; i++) {
            if (i < 10) {
              days.push(`0${i}`)
            } else {
              days.push(i)
            }
          }

          return days.join('|')
        },
        h: '00|01|02|03|04|05|06|07|08|09|10|11|12|13|14|15|16|17|18|19|20|21|22|23',
        m: '00|01|02|03|04|05|06|07|08|09|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31|32|33|34|35|36|37|38|39|40|41|42|43|44|45|46|47|48|49|50|51|52|53|54|55|56|57|58|59',
        s: '00|01|02|03|04|05|06|07|08|09|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31|32|33|34|35|36|37|38|39|40|41|42|43|44|45|46|47|48|49|50|51|52|53|54|55|56|57|58|59'
      }
    } else {
      return this.props.pattern
    }
  })

  protected special = computed<string[] | string>(() => {
    if (this.geo.value) {
      return ['Y', 'M', 'D', 'h', 'm', 's']
    } else {
      return this.props.special
    }
  })

  protected standard = computed(() => {
    const character = this.character.value
    const value = [] as string[]
    let stop: boolean
    let key = 0 as number

    if (character.length > 0) {
      this.mask.value.forEach(char => {
        if (!stop) {
          if (!this.ifSpecial(char)) {
            value.push(char)
          } else if (key in character) {
            value.push(character[key++])
          } else {
            stop = true
          }
        }
      })
    }

    return value.join('')
  })

  protected characterToValue (selection: number): number {
    let selectionChar = -1 as number
    let value: number | undefined

    this.mask.value.forEach((char, index) => {
      if (this.ifSpecial(char)) {
        selectionChar++
      }

      if (value === undefined && selectionChar >= selection) {
        value = index
      }
    })

    return value !== undefined ? value : this.mask.value.length
  }

  protected getCharacter (text: string): string[] {
    const value = [] as string[]

    text.split('').forEach(char => {
      if (char.match(this.props.match)) {
        value.push(char)
      }
    })

    return value
  }

  protected getMaskChar (selection: number): string {
    return this.mask.value?.[selection]
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

  protected goSelection (selection: number): this {
    requestAnimationFrame(() => {
      if (this.element.value) {
        this.element.value.selectionEnd = selection
        this.element.value.selectionStart = selection
      }
    })

    return this
  }

  protected ifSpecial (char: string): boolean {
    return isSelected(char, this.special.value)
  }

  onInput (event: InputEvent) {
    console.log('event', event)
  }

  onKeydown (event: KeyboardEvent) {
    const target = event.target as HTMLInputElement

    if (event.key === 'Unidentified' || event.keyCode === 229) {
      this.unidentified = true
      this.length = target.value.length
      this.selection.start = target.selectionStart
      this.selection.end = target.selectionEnd
    } else if (event.key === 'Backspace' || event.keyCode === 8) {
      event.preventDefault()

      if (target.selectionStart !== null) {
        if (target.selectionStart === target.selectionEnd) {
          this.popValue(target.selectionStart)
        } else if (target.selectionEnd !== null) {
          for (let i = target.selectionEnd; i > target.selectionStart; i--) {
            this.popValue(i, false)
          }
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
        for (let i = target.selectionEnd; i > target.selectionStart; i--) {
          this.popValue(i, false)
        }

        this.setValue(target.selectionStart, event.key)
      }
    }
  }

  popCharacter (selection: number): this {
    this.character.value.splice(selection, 1)
    return this
  }

  popValue (selection: number, go = true): this {
    const index = selection - 1

    if (
      this.maxLength.value >= selection && (
        go ||
        this.ifSpecial(this.getMaskChar(index))
      )
    ) {
      const selectionChar = this.valueToCharacter(index)

      this.popCharacter(selectionChar)
      this.goSelection(this.characterToValue(selectionChar))
      this.shiftCharacter(0)
    }

    return this
  }

  reset (value: string): string[] {
    const data = [] as string[]

    if (value) {
      if (this.props.paste) {
        data.push(...this.getCharacter(value))
      } else {
        const chars = this.ifDate.value
          ? new GeoDate(value, this.props.type).locale().value
          : value

        chars.split('').forEach((char, selection) => {
          if (this.ifSpecial(this.getMaskChar(selection))) {
            data.push(char)
          }
        })
      }
    }

    return data
  }

  setCharacter (selection: number, char: string): this {
    this.character.value.splice(selection, 0, char)
    return this
  }

  setValue (
    selection: number,
    char: string,
    focus = true as boolean
  ): boolean {
    this.shiftCharacter()

    const wait = this.getMaskChar(selection)

    if (
      wait &&
      this.maxLength.value > this.standard.value.length
    ) {
      if (this.ifSpecial(wait)) {
        if (char.toString().match(this.props.match)) {
          const selectionChar = this.valueToCharacter(selection)
          this.setCharacter(selectionChar, char)

          if (focus) {
            this.goSelection(this.characterToValue(selectionChar + 1))
          }

          return true
        }
      } else {
        return this.setValue(selection + 1, char)
      }
    }

    return false
  }

  protected shiftCharacter (status = 1): this {
    this.length = this.character.value.length + status
    return this
  }

  protected valueToCharacter (selection: number): number {
    let value = -1

    this.mask.value.forEach((char, index) => {
      if (index <= selection && this.ifSpecial(char)) {
        value++
      }
    })

    return value
  }
}
