import { AssociativeType, CallbackBindType } from '../types'
import { computed, ComputedRef, Ref } from 'vue'

export type UseIconSetupType = {
  iconBind: ComputedRef<string | AssociativeType>
  iconTrailingBind: ComputedRef<string | AssociativeType>
}

export class UseIcon {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly getBind: CallbackBindType<string>,
    protected readonly icon: Ref<string | AssociativeType>,
    protected readonly iconTrailing: Ref<string | AssociativeType>,
    protected readonly selected: Ref<boolean>,
    protected readonly disabled: Ref<boolean>,
    protected readonly turn?: Ref<boolean>,
    protected readonly inEnd?: boolean
  ) {
  }

  readonly iconBind = computed<AssociativeType>(() => {
    return {
      active: this.selected.value,
      disabled: this.disabled.value
    }
  })

  readonly iconTrailingBind = computed<AssociativeType>(() => {
    return {
      class: 'is-icon is-trailing',
      disabled: this.disabled.value,
      inEnd: this.inEnd,
      turn: this.turn?.value
    }
  })

  getSetup (): UseIconSetupType {
    return {
      iconBind: this.getBind(this.icon, this.iconBind, 'icon'),
      iconTrailingBind: this.getBind(this.iconTrailing, this.iconTrailingBind, 'icon')
    }
  }
}
