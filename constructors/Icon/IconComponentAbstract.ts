import { computed, ComputedRef } from 'vue'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { props } from './props'
import {
  AssociativeType,
  ComponentBaseType
} from '../types'

export type IconSetupType = ComponentBaseType & {
  ifActive: ComputedRef<boolean>
  iconBind: ComputedRef<string | AssociativeType>
  iconActiveBind: ComputedRef<string | AssociativeType>
}

export abstract class IconComponentAbstract extends ComponentAbstract {
  static readonly instruction = props as AssociativeType

  setup (): IconSetupType {
    const classes = this.getClasses()
    const styles = this.getStyles()

    return {
      ...this.getBasic(),
      classes,
      styles,
      ifActive: this.ifActive,
      iconBind: this.getBind(this.refs.icon, this.image),
      iconActiveBind: this.getBind(this.refs.iconActive, this.image)
    }
  }

  protected readonly ifActive = computed(() => this.props.iconActive && this.props.active)

  protected readonly image = computed(() => {
    return {
      disabled: this.props.disabled,
      turn: this.props.turn
    }
  })
}
