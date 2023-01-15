import { ref } from 'vue'

export class MaskRubberTransition {
  readonly data = ref<string>('')

  disabled (char: string): boolean {
    return this.data.value !== char
  }

  get (): string {
    return this.data.value
  }

  reset (): this {
    return this.set('')
  }

  set (char: string): this {
    this.data.value = char
    return this
  }
}
