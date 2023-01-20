import { computed, Ref, ref, watch } from 'vue'
import { MaskItem } from './MaskItem'
import { MaskSelection } from './MaskSelection'

export class MaskCharacter {
  protected readonly length = ref<number>(0)

  constructor (
    protected readonly mask: MaskItem,
    protected readonly selection: MaskSelection,
    protected readonly character: Ref<string[]>
  ) {
    watch(this.character, value => {
      this.length.value = value.length
    })
  }

  readonly focus = computed<string>(() => this.mask.getItem(this.selection.getFocus()))
  readonly next = computed<string>(() => this.mask.getItem(this.selection.getNext()))

  getFocus (): string {
    return this.focus.value
  }

  getLength (): number {
    return this.length.value
  }

  getNext (): string {
    return this.next.value
  }

  pop (): this {
    this.character.value.splice(this.selection.get() - 1, 1)
    this.selection.goBack()

    return this
  }

  reset (): this {
    this.character.value = []
    this.selection.set(0)

    return this
  }

  set (char: string): this {
    this.character.value.splice(this.selection.get(), 0, char)
    this.selection.goNext()

    return this
  }

  shift (status = 1 as number): this {
    this.length.value = this.character.value.length + status
    return this
  }
}
