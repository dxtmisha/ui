import { Ref } from 'vue'

export class UseEnabled {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly disabled: Ref<boolean>,
    private readonly readonly?: Ref<boolean>
  ) {
  }

  is (): boolean {
    return !this.disabled.value && !this.readonly?.value
  }

  isDisabled (): boolean {
    return !!this.disabled?.value
  }

  isReadonly (): boolean {
    return !!this.readonly?.value
  }
}
