import { computed, Ref } from 'vue'
import { UseInverse } from '../Use/UseInverse'
import { AssociativeType } from '../types'

export class UseProgress {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly type: string,
    private readonly inverse?: UseInverse,
    private readonly visible?: Ref<boolean>,
    private readonly indeterminate?: Ref<string>,
    private readonly value?: Ref<number>
  ) {
  }

  readonly item = computed<AssociativeType>(() => {
    return {
      type: this.type,
      value: this.value?.value,
      visible: this.visible?.value || true,
      indeterminate: this.indeterminate?.value,
      inverse: this.inverse?.get()
    }
  })

  get (): AssociativeType {
    return this.item.value
  }
}
