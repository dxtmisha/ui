import { computed, ComputedRef } from 'vue'
import { ButtonComponentItemAbstract } from '../Button/ButtonComponentItemAbstract'
import { props } from './props'
import {
  AssociativeType,
  ComponentBaseType,
  EventCallbackRequiredType
} from '../types'

export type ListItemSetupType = ComponentBaseType & {
  iconBind: ComputedRef<string | AssociativeType>
  iconTrailingBind: ComputedRef<string | AssociativeType>
  progressIconBind: ComputedRef<AssociativeType>
  progressTextBind: ComputedRef<AssociativeType>
  onClick: EventCallbackRequiredType<void, MouseEvent>
}

export abstract class ListItemComponentAbstract extends ButtonComponentItemAbstract {
  static readonly instruction = props as AssociativeType
  static readonly emits = ['on-click', 'on-trailing'] as string[]

  protected abstract appearanceInverse: string[]

  setup (): ListItemSetupType {
    const classes = this.getClasses()
    const styles = this.getStyles()

    return {
      ...this.getBasic(),
      classes,
      styles,
      iconBind: this.getBind(this.refs.icon, this.icon, 'icon'),
      iconTrailingBind: this.getBind(this.refs.iconTrailing, this.iconTrailing, 'icon'),
      progressIconBind: this.progressIcon,
      progressTextBind: this.progressText,
      onClick: (event: MouseEvent) => this.onClick(event)
    }
  }

  readonly ifInverse = computed(() => {
    return this.props.selected && (
      this.appearanceInverse.indexOf(this.props.appearance) !== -1 ||
      this.appearanceInverse.indexOf('all') !== -1
    )
  }) as ComputedRef<boolean>

  readonly progressIcon = computed(() => {
    return {
      inverse: this.ifInverse.value,
      type: 'circular',
      visible: true
    }
  })

  readonly progressText = computed(() => {
    return {
      inverse: this.ifInverse.value,
      visible: true
    }
  })
}
