import { computed, Ref, ref } from 'vue'
import { isFilled } from '../../functions'

export class FieldLeft {
  readonly element = ref<HTMLElement | undefined>()
  readonly value = ref<string>('0px')

  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly slots: object,
    private readonly icon: Ref<string | object>,
    private readonly align: Ref<string>,
    private readonly arrow: Ref<boolean>
  ) {
  }

  readonly isLeft = computed<boolean>(
    () => (isFilled(this.arrow.value) && this.align.value !== 'right') ||
      isFilled(this.icon.value) ||
      'left' in this.slots
  )

  is (): boolean {
    return this.isLeft.value
  }

  update (): void {
    if (this.isLeft.value) {
      this.value.value = `${this.element.value?.offsetWidth}px`
    } else {
      this.value.value = '0px'
    }
  }
}
