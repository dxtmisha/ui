import { computed, Ref, watch } from 'vue'
import { MaskItem } from './MaskItem'
import { MaskSelection } from './MaskSelection'

export class MaskCharacter {
  constructor (
    protected readonly mask: MaskItem,
    protected readonly selection: MaskSelection,
    protected readonly character: Ref<string[]>,
    protected readonly length: Ref<number>
  ) {
    watch(this.character, value => {
      this.length.value = value.length
    })
  }

  readonly focus = computed<string>(() => this.mask.getItem(this.selection.getFocus()))
  readonly immediate = computed<string>(() => this.mask.getItem(this.selection.getImmediate()))
  readonly next = computed<string>(() => this.mask.getItem(this.selection.getNext()))

  getFocus (): string {
    return this.focus.value
  }

  getImmediate (): string {
    return this.immediate.value
  }

  getLength (): number {
    return this.length.value
  }

  getNext (): string {
    return this.next.value
  }

  pop (): this {
    this.character.value.splice(this.selection.get() - 1, 1)
    this.selection.goBack().resetImmediate()

    return this
  }

  reset (): this {
    this.character.value = []
    this.selection.set(0).resetImmediate()

    return this
  }

  set (char: string): this {
    this.character.value.splice(this.selection.get(), 0, char)
    this.selection.goNext().resetImmediate()

    return this
  }

  shift (status = 1 as number): this {
    this.length.value = this.character.value.length + status
    return this
  }
}
