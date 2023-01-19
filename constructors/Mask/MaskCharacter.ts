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

  focus = computed<string>(() => this.mask.getChar(this.selection.getFocus()) || '')
  next = computed<string>(() => this.mask.getChar(this.selection.getNext()) || '')

  pop (selection: number): this {
    this.character.value.splice(selection, 1)
    this.selection.set(selection - 1)

    return this
  }

  reset (): this {
    this.character.value = []
    this.selection.set(0)

    return this
  }

  set (selection: number, char: string): this {
    this.character.value.splice(selection, 0, char)
    this.selection.set(selection)

    return this
  }

  shift (status = 1 as number): this {
    this.length.value = this.character.value.length + status
    return this
  }
}
