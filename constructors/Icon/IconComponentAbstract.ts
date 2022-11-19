import { computed, ComputedRef, Ref, ref } from 'vue'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { props } from './props'
import {
  AssociativeType,
  ComponentClassesType,
  ComponentStylesType
} from '../types'

export type IconSetupType = {
  element: Ref<HTMLElement | undefined>
  name: ComputedRef<string>
  nameDesign: ComputedRef<string>
  baseClass: ComputedRef<string>
  classes: ComputedRef<ComponentClassesType>
  styles: ComputedRef<ComponentStylesType>
  ifActive: ComputedRef<boolean>
  iconBind: ComputedRef<string | AssociativeType>
  iconActiveBind: ComputedRef<string | AssociativeType>
}

export abstract class IconComponentAbstract extends ComponentAbstract {
  protected readonly instruction = props as AssociativeType
  protected readonly element = ref<HTMLElement | undefined>()

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
      element: this.element,
      ...this.baseInit(),
      classes,
      styles,
      ifActive: this.ifActive,
      iconBind: this.getBind(this.refs.icon, imageBind),
      iconActiveBind: this.getBind(this.refs.iconActive, imageBind)
    }
  }

  protected readonly ifActive = computed(() => this.props.iconActive && this.props.active)
}
