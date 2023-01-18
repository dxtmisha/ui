import { computed, ComputedRef, Ref, ref, watch } from 'vue'
import { MaskRubber } from './MaskRubber'
import { isSelected } from '../../functions'

export class MaskCharacter {
  protected readonly length = ref<number>(0)

  selection = ref<number>(0)

  constructor (
    protected readonly character: Ref<string[]>,
    protected readonly mask: Ref<string[]>,
    protected readonly rubbers: MaskRubber,
    protected readonly match: Ref<RegExp>,
    protected readonly special: ComputedRef<string[] | string>
  ) {
    watch(this.character, value => {
      this.length.value = value.length
    })
  }

  charMask = computed<string>(() => this.mask.value[this.maskSelection.value])
  charMaskNext = computed<string>(() => this.mask.value[this.maskSelectionNext.value])

  maskSelectionNext = computed<number>(() => this.getSelection(this.selection.value + 1))
  maskSelection = computed<number>(() => this.getSelection(this.selection.value))

  standard = computed<string>(() => {
    const character = this.character.value
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
            key >= character.length &&
            this.rubbers.transition.disabled(char)
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

  protected getSelection (selection: number): number {
    let selectionChar = -1 as number
    let value: number | undefined

    this.mask.value.forEach((char, index) => {
      if (this.ifSpecial(char)) {
        selectionChar++
      }

      if (
        value === undefined &&
        selectionChar >= selection
      ) {
        value = index
      }
    })

    return value !== undefined ? value : this.mask.value.length
  }

  protected ifMatch (char: string): boolean {
    return !!char.match(this.match.value)
  }

  protected ifSpecial (char: string): boolean {
    return isSelected(char, this.special.value)
  }

  filter (text: string): string[] {
    return text.split('').filter(char => this.ifMatch(char))
  }

  pop (selection: number): this {
    this.character.value.splice(selection, 1)
    this.setSelection(selection - 1)

    return this
  }

  reset (): this {
    this.character.value = []
    return this
  }

  set (selection: number, char: string): this {
    this.character.value.splice(selection, 0, char)
    this.setSelection(selection)

    return this
  }

  setSelection (selection: number): this {
    this.selection.value = selection
    return this
  }

  shift (status = 1 as number): this {
    this.length.value = this.character.value.length + status
    return this
  }

  toCharacter (selection: number): this {
    let value = -1

    this.mask.value.forEach((char, index) => {
      if (
        index <= selection &&
        this.ifSpecial(char)
      ) {
        value++
      }
    })

    this.setSelection(value)
    return this
  }
}
