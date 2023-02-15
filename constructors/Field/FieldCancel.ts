import { computed, Ref } from 'vue'
import { FieldArrow } from './FieldArrow'
import { FieldValue } from './FieldValue'
import { UseEnabled } from '../Use/UseEnabled'
import { isFilled } from '../../functions'

export class FieldCancel {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly value: FieldValue,
    private readonly enabled: UseEnabled,
    private readonly arrow: FieldArrow,
    private readonly cancel: Ref<boolean | string>
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

  getClass (): object {
    return { 'is-cancel': this.item }
  }

  private isCancel (): boolean {
    return isFilled(this.cancel.value) && this.cancel.value !== 'hide' && !this.arrow.is()
  }
}
