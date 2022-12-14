import { computed, ComputedRef } from 'vue'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { props } from './props'
import {
  AssociativeType,
  ComponentBaseType
} from '../types'

export type ListItemSetupType = ComponentBaseType

export abstract class ListItemComponentAbstract extends ComponentAbstract {
  static readonly instruction = props as AssociativeType
  static readonly emits = ['on-click', 'on-trailing'] as string[]

  protected abstract appearanceInverse: string[]

  setup (): ListItemSetupType {
    const classes = this.getClasses()
    const styles = this.getStyles()

    return {
      ...this.getBasic(),
      classes,
      styles
    }
  }

  readonly ifRipple = computed(() => this.props.ripple &&
    !this.props.disabled &&
    !this.props.readonly
  ) as ComputedRef<boolean>
}
