import { computed, Ref } from 'vue'
import { AssociativeType, CallbackBindType } from '../types'
import { UseIcon } from '../Use/UseIcon'
import { FieldIconSetupType } from './types'

export class FieldIcon extends UseIcon {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    getBind: CallbackBindType<string>,
    icon: Ref<string | AssociativeType>,
    iconTrailing: Ref<string | AssociativeType>,
    private readonly iconCancel: Ref<string | AssociativeType>,
    private readonly iconPrevious: Ref<string | AssociativeType>,
    private readonly iconNext: Ref<string | AssociativeType>,
    selected: Ref<boolean>,
    disabled: Ref<boolean>,
    private readonly disabledPrevious: Ref<boolean>,
    private readonly disabledNext: Ref<boolean>,
    turn?: Ref<boolean>
  ) {
    super(
      getBind,
      icon,
      iconTrailing,
      selected,
      disabled,
      turn,
      undefined,
      false
    )
  }

  readonly iconCancelBind = computed<AssociativeType>(() => {
    return { class: 'is-icon is-cancel' }
  })

  readonly iconPreviousBind = computed<AssociativeType>(() => {
    return {
      class: 'is-icon is-previous',
      background: true,
      backgroundActive: true,
      disabled: this.disabled?.value || this.disabledPrevious.value
    }
  })

  readonly iconNextBind = computed<AssociativeType>(() => {
    return {
      class: 'is-icon is-next',
      background: true,
      backgroundActive: true,
      disabled: this.disabled?.value || this.disabledNext.value
    }
  })

  getFieldSetup (): FieldIconSetupType {
    return {
      ...this.getSetup(),
      iconCancelBind: this.getBind(this.iconCancel, this.iconCancelBind, 'icon'),
      iconPreviousBind: this.getBind(this.iconPrevious, this.iconPreviousBind, 'icon'),
      iconNextBind: this.getBind(this.iconNext, this.iconNextBind, 'icon')
    }
  }
}
