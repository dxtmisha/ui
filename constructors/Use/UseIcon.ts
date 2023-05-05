import { computed, ComputedRef, Ref } from 'vue'
import { AssociativeType } from '../types'
import { CallbackBindType, RefType } from '../typesRef'

export type UseIconSetupType = {
  iconBind: ComputedRef<string | AssociativeType>
  iconTrailingBind?: ComputedRef<string | AssociativeType>
}

export class UseIcon {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly getBind: CallbackBindType<string>,
    protected readonly icon: Ref<string | AssociativeType>,
    protected readonly iconTrailing?: Ref<string | AssociativeType>,
    protected readonly selected?: Ref<boolean>,
    protected readonly disabled?: Ref<boolean>,
    protected readonly turn?: Ref<boolean>,
    protected readonly hide?: Ref<boolean>,
    protected readonly inEnd = true as boolean,
    protected readonly conditions?: RefType,
    protected readonly animationType = 'type2' as string
  ) {
  }

  readonly isIcon = computed<boolean>(
    () => (!!this.icon.value || !!this.iconTrailing?.value) && !this.conditions?.value
  )

  readonly iconBind = computed<AssociativeType>(() => {
    return {
      class: 'is-icon-item is-main',
      active: this.selected?.value,
      disabled: this.disabled?.value,
      hide: this.hide?.value,
      animationType: this.animationType
    }
  })

  readonly iconTrailingBind = computed<AssociativeType>(() => {
    return {
      class: 'is-icon-item is-trailing',
      disabled: this.disabled?.value,
      inEnd: this.inEnd,
      turn: this.turn?.value
    }
  })

  getClass (): object {
    return { 'is-icon': this.isIcon }
  }

  getSetup (): UseIconSetupType {
    return {
      iconBind: this.getBind(this.icon, this.iconBind, 'icon'),
      iconTrailingBind: this.iconTrailing ? this.getBind(this.iconTrailing, this.iconTrailingBind, 'icon') : undefined
    }
  }
}
