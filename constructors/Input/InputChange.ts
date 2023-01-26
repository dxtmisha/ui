import { Ref, ref, watch } from 'vue'
import { InputValue } from './InputValue'
import { isFilled } from '../../functions'

export class InputChange {
  protected readonly item = ref<boolean>(false)

  constructor (
    protected readonly value: InputValue,
    protected readonly validationMessage?: Ref<string>
  ) {
    if (this.validationMessage && !this.updateMessage()) {
      watch(this.validationMessage, () => this.updateMessage())
    }
  }

  get (): boolean {
    return this.item.value
  }

  is (): boolean {
    return this.get()
  }

  set (value: boolean): this {
    this.item.value = value
    return this
  }

  updateMessage (): boolean {
    const isMessage = isFilled(this.validationMessage?.value)

    if (isMessage) {
      this.set(true)
    }

    return isMessage
  }
}
