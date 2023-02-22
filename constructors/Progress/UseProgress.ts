import { computed, Ref } from 'vue'
import { UseInverse } from '../Use/UseInverse'
import { AssociativeType } from '../types'

export class UseProgress {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly type: string,
    private readonly inverse: UseInverse,
    private readonly visible?: Ref<string>,
    private readonly value?: Ref<number>
  ) {
  }

  readonly item = computed<AssociativeType>(() => {
    return {
      type: this.type,
      value: this.value?.value || undefined,
      visible: this.visible?.value || true,
      inverse: this.inverse.get()
    }
  })

  get (): AssociativeType {
    return this.item.value
  }
}