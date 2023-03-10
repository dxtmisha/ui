import { computed, ComputedRef, Ref } from 'vue'
import { AssociativeType, CallbackBindType } from '../types'

export type ListItemCheckboxSetupType = {
  isCheckbox: ComputedRef<boolean>
  checkboxBind: ComputedRef<AssociativeType>
}

export class ListItemCheckbox {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly getBind: CallbackBindType<boolean>,
    private readonly checkbox: Ref<boolean>,
    private readonly checkboxRight: Ref<boolean>,
    private readonly selected: Ref<boolean>,
    private readonly disabled: Ref<boolean>
  ) {
  }

  private readonly is = computed<boolean>(() => this.checkbox.value || this.checkboxRight.value)
  private readonly className = computed<string>(() => this.checkboxRight.value ? 'is-right' : 'is-left')
  private readonly extra = computed<AssociativeType>(() => {
    return {
      class: this.className.value,
      disabled: this.disabled.value,
      readonly: true
    }
  })

  getSetup (): ListItemCheckboxSetupType {
    return {
      isCheckbox: this.is,
      checkboxBind: this.getBind(this.selected, this.extra, 'value')
    }
  }
}
