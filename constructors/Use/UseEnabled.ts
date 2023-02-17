import { computed, Ref } from 'vue'

export class UseEnabled {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly disabled: Ref<boolean>,
    private readonly readonly?: Ref<boolean>
  ) {
  }

  readonly item = computed<boolean>(() => !this.disabled.value && !this.readonly?.value)

  is (): boolean {
    return this.item.value
  }

  isDisabled (): boolean {
    return !!this.disabled?.value
  }

  isReadonly (): boolean {
    return !!this.readonly?.value
  }
}
