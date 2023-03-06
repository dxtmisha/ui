import { computed, Ref } from 'vue'

export class UseEnabled {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly disabled?: Ref<boolean>,
    private readonly readonly?: Ref<boolean>,
    private readonly progress?: Ref<boolean>,
    private readonly ripple?: Ref<boolean>
  ) {
  }

  readonly item = computed<boolean>(
    () => !this.disabled?.value && !this.readonly?.value && !this.progress?.value
  )

  readonly itemDisabled = computed<boolean | undefined>(() => this.isDisabled() || undefined)
  readonly itemRipple = computed<boolean>(() => !!this.ripple?.value && this.is())

  is (): boolean {
    return this.item.value
  }

  isDisabled (): boolean {
    return !!this.disabled?.value
  }

  isReadonly (): boolean {
    return !!this.readonly?.value
  }

  isProgress (): boolean {
    return !!this.progress?.value
  }

  isRipple (): boolean {
    return this.itemRipple.value
  }
}
