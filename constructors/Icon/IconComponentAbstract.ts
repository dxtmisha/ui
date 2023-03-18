import { computed, ComputedRef } from 'vue'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { props } from './props'
import {
  AssociativeType,
  ComponentBaseType
} from '../types'

export type IconSetupType = ComponentBaseType & {
  isActive: ComputedRef<boolean>
  iconBind: ComputedRef<string | AssociativeType>
  iconActiveBind: ComputedRef<string | AssociativeType>
}

export abstract class IconComponentAbstract extends ComponentAbstract {
  static readonly instruction = props as AssociativeType

  protected readonly classesExtra = ['background'] as string[]
  protected readonly stylesProps = [
    'background',
    'rounded',
    'size'
  ] as string[]

  setup (): IconSetupType {
    const classes = this.getClasses()
    const styles = this.getStyles()

    return {
      ...this.getBasic(),
      classes,
      styles,
      isActive: this.isActive,
      iconBind: this.getBind(this.refs.icon, this.image),
      iconActiveBind: this.getBind(this.refs.iconActive, this.image)
    }
  }

  protected readonly isActive = computed(() => this.props.iconActive && this.props.active)

  protected readonly image = computed(() => {
    return {
      disabled: this.props.disabled,
      turn: this.props.turn
    }
  })
}
