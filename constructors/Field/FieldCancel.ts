import { computed, Ref } from 'vue'
import { FieldValue } from './FieldValue'
import { UseEnabled } from '../Use/UseEnabled'
import { isFilled } from '../../functions'

export class FieldCancel {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly value: FieldValue,
    private readonly enabled: UseEnabled,
    private readonly cancel: Ref<boolean | string>,
    private readonly arrow: Ref<boolean>
  ) {
  }

  readonly item = computed<boolean>(() => {
    return this.isCancel() &&
      this.value.is() &&
      this.enabled.is()
  })

  is () {
    return this.item.value
  }

  private isCancel (): boolean {
    return isFilled(this.cancel.value) && this.cancel.value !== 'hide' && !this.arrow.value
  }
}
