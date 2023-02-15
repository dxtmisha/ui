import { computed, ref, Ref } from 'vue'
import { FieldCancel } from './FieldCancel'
import { isFilled } from '../../functions'

export class FieldRight {
  readonly element = ref<HTMLElement | undefined>()
  readonly value = ref<string>('0px')

  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly slots: object,
    private readonly cancel: FieldCancel,
    private readonly iconTrailing: Ref<string | object>,
    private readonly align: Ref<string>,
    private readonly arrow: Ref<boolean>
  ) {
  }

  readonly isRight = computed<boolean>(
    () => (isFilled(this.arrow.value) && this.align.value !== 'left') ||
      isFilled(this.iconTrailing.value) ||
      'right' in this.slots ||
      this.cancel.is()
  )

  is (): boolean {
    return this.isRight.value
  }

  update () {
    if (this.isRight.value) {
      this.value.value = `${this.element.value?.offsetWidth}px`
    } else {
      this.value.value = '0px'
    }
  }
}
