import { computed, ref } from 'vue'
import { MaskItem } from './MaskItem'
import { MaskSpecial } from './MaskSpecial'

export class MaskSelection {
  protected readonly item = ref<number>(0)

  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly mask: MaskItem,
    protected readonly special: MaskSpecial
  ) {
  }

  readonly focus = computed<number>(() => this.getCharacter(this.item.value))
  readonly next = computed<number>(() => this.getCharacter(this.item.value + 1))

  get (): number {
    return this.item.value
  }

  getCharacter (selection: number): number {
    let selectionChar = -1 as number
    let value: number | undefined

    this.mask.get().forEach((char, index) => {
      if (this.special.isSpecial(char)) {
        selectionChar++
      }

      if (
        value === undefined &&
        selectionChar >= selection
      ) {
        value = index
      }
    })

    return value !== undefined ? value : this.mask.getLength()
  }

  getFocus (): number {
    return this.focus.value
  }

  getNext (): number {
    return this.next.value
  }

  goBack (): this {
    if (this.item.value > 0) {
      this.item.value--
    }

    return this
  }

  goNext (): this {
    if (this.next.value <= this.mask.getLength()) {
      this.item.value++
    }

    return this
  }

  set (selection: number): this {
    this.item.value = selection
    return this
  }

  setByMask (selection: number): this {
    let selectionChar = -1 as number
    let value: number | undefined

    this.mask.get().forEach((char, index) => {
      if (this.special.isSpecial(char)) {
        selectionChar++

        if (value === undefined && index >= selection) {
          value = selectionChar
        }
      }
    })

    this.set(value !== undefined ? value : selectionChar + 1)
    return this
  }
}
