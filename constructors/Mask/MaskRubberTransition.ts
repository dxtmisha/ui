import { ref } from 'vue'

export class MaskRubberTransition {
  readonly item = ref<string>('')

  is (): boolean {
    return this.item.value !== ''
  }

  disabled (char: string): boolean {
    return this.item.value !== char
  }

  get (): string {
    return this.item.value
  }

  set (char: string): this {
    this.item.value = char
    return this
  }

  reset (): this {
    return this.set('')
  }
}
