import { computed, ComputedRef, Ref } from 'vue'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { props } from './props'
import {
  AssociativeType,
  ComponentAssociativeType,
  ComponentStylesType
} from '../types'

export type ButtonClassesType = {
  main: ComponentAssociativeType
  text: ComponentAssociativeType
}
export type ButtonSetupType = {
  element: Ref<HTMLElement | undefined>
  name: ComputedRef<string>
  nameDesign: ComputedRef<string>
  baseClass: ComputedRef<string>
  classes: ComputedRef<ButtonClassesType>
  styles: ComputedRef<ComponentStylesType>
  ifInverse: ComputedRef<boolean>
  ifRipple: ComputedRef<boolean>
  ifText: ComputedRef<boolean>
  iconBind: ComputedRef<string | AssociativeType>
  iconTrailingBind: ComputedRef<string | AssociativeType>
}

export abstract class ButtonComponentAbstract extends ComponentAbstract {
  protected readonly instruction = props as AssociativeType
  protected abstract appearanceInverse: string[]

  setup (): ButtonSetupType {
    const classes = this.getClasses<ButtonClassesType>({
      main: {
        'is-icon': this.isIcon
      }
    })
    const styles = this.getStyles({})

    return {
      ...this.baseInit(),
      classes,
      styles,
      ifInverse: this.ifInverse,
      ifRipple: this.ifRipple,
      ifText: this.ifText,
      iconBind: this.getBind(this.refs.icon, 'icon'),
      iconTrailingBind: this.getBind(this.refs.iconTrailing, 'icon')
    }
  }

  readonly ifRipple = computed(() => this.props.ripple &&
    !this.props.disabled &&
    !this.props.readonly
  ) as ComputedRef<boolean>

  readonly ifInverse = computed(() => this.appearanceInverse.indexOf(this.props.appearance) !== -1) as ComputedRef<boolean>
  readonly ifText = computed(() => this.props.text || 'default' in this.context.slots) as ComputedRef<boolean>

  readonly isIcon = computed(() => (this.refs.icon || this.refs.iconTrailing) && !this.ifText.value) as ComputedRef<boolean>
}
