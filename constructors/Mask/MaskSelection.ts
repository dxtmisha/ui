import { computed, ref } from 'vue'
import { MaskItem } from './MaskItem'
import { MaskSpecial } from './MaskSpecial'

export class MaskSelection {
  protected readonly item = ref<number>(0)
  protected readonly immediate = ref<number>(0)

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

  protected getCharacter (selection: number): number {
    let value: number | undefined

    this.mask.getSpecial().forEach(item => {
      if (
        value === undefined &&
        item.index >= selection
      ) {
        value = item.key
      }
    })

    return value !== undefined ? value : this.mask.getLength()
  }

  getFocus (): number {
    return this.focus.value
  }

  getImmediate (): number {
    return this.immediate.value
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

  setImmediate (selection: number): this {
    this.immediate.value = selection
    return this
  }

  setByMask (selection: number): this {
    let value: number | undefined
    let immediate: number | undefined

    this.mask.getSpecial().forEach(item => {
      if (value === undefined && item.key >= selection) {
        value = item.index
      }

      if (item.key <= selection) {
        immediate = item.index
      }
    })

    this.set(value !== undefined ? value : this.mask.getLengthBySpecial())
    this.setImmediate(immediate !== undefined ? immediate : this.mask.getLengthBySpecial())

    return this
  }
}
