import { computed, ComputedRef } from 'vue'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { props } from './props'
import {
  AssociativeType,
  ComponentBaseType,
  ComponentClassesType,
  ComponentStylesType
} from '../types'

export type IconSetupType = ComponentBaseType & {
  classes: ComputedRef<ComponentClassesType>
  styles: ComputedRef<ComponentStylesType>
  ifActive: ComputedRef<boolean>
  iconBind: ComputedRef<string | AssociativeType>
  iconActiveBind: ComputedRef<string | AssociativeType>
}

export abstract class IconComponentAbstract extends ComponentAbstract {
  protected readonly instruction = props as AssociativeType

  setup (): IconSetupType {
    const classes = this.getClasses({})
    const styles = this.getStyles({})

    const imageBind = computed(() => {
      return {
        disabled: this.props.disabled,
        turn: this.props.turn
      }
    })

    return {
      ...this.getBasic(),
      classes,
      styles,
      ifActive: this.ifActive,
      iconBind: this.getBind(this.refs.icon, imageBind),
      iconActiveBind: this.getBind(this.refs.iconActive, imageBind)
    }
  }

  protected readonly ifActive = computed(() => this.props.iconActive && this.props.active)
}
