import { computed, ComputedRef, Ref } from 'vue'
import { AssociativeType } from '../types'

export type UseValueSetupType = {
  valueBind: ComputedRef
}

export class UseValue {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly value: Ref,
    private readonly detail?: Ref<AssociativeType>
  ) {
  }

  readonly item = computed(() => this.value.value || this.detail?.value)

  get (): any {
    return this.item.value
  }

  getDetail (): AssociativeType | undefined {
    return this.detail?.value
  }

  getSetup (): UseValueSetupType {
    return {
      valueBind: this.item
    }
  }
}
