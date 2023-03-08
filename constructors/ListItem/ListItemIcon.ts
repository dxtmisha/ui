import { UseIcon, UseIconSetupType } from '../Use/UseIcon'
import { AssociativeType, CallbackBindType, RefType } from '../types'
import { computed, ComputedRef, Ref } from 'vue'

export type ListItemIconSetupType = UseIconSetupType & {
  thumbnailBind?: ComputedRef<string | AssociativeType>
}

export class ListItemIcon extends UseIcon {
  constructor (
    getBind: CallbackBindType<string>,
    icon: Ref<string | AssociativeType>,
    iconTrailing?: Ref<string | AssociativeType>,
    protected readonly thumbnail?: Ref<string | AssociativeType>,
    protected readonly height?: Ref<string>,
    selected?: Ref<boolean>,
    disabled?: Ref<boolean>,
    turn?: Ref<boolean>,
    conditions?: RefType
  ) {
    super(
      getBind,
      icon,
      iconTrailing,
      selected,
      disabled,
      turn,
      undefined,
      true,
      conditions
    )
  }

  readonly isIconByThumbnail = computed<boolean>(
    () => this.isIcon.value || (!!this.thumbnail?.value && !this.conditions?.value)
  )

  readonly thumbnailBind = computed<AssociativeType>(() => {
    return {
      class: 'is-icon-item is-thumbnail',
      size: this.height?.value,
      background: true,
      active: this.selected?.value,
      disabled: this.disabled?.value
    }
  })

  getClass (): object {
    return { 'is-icon': this.isIconByThumbnail }
  }

  getSetupByThumbnail (): ListItemIconSetupType {
    return {
      ...this.getSetup(),
      thumbnailBind: this.thumbnail ? this.getBind(this.thumbnail, this.thumbnailBind, 'icon') : undefined
    }
  }
}
