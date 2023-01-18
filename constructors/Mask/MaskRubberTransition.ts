import { ref } from 'vue'

export class MaskRubberTransition {
  readonly item = ref<string>('')

  disabled (char: string): boolean {
    return this.item.value !== char
  }

  get (): string {
    return this.item.value
  }

  reset (): this {
    return this.set('')
  }

  set (char: string): this {
    this.item.value = char
    return this
  }
}
