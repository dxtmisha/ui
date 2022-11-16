import { ComputedRef, Ref, ref } from 'vue'
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
}

export abstract class IconComponentAbstract extends ComponentAbstract {
  protected readonly instruction = props as AssociativeType
  protected readonly element = ref<HTMLElement | undefined>()

  setup (): IconSetupType {
    const classes = this.getClasses({})
    const styles = this.getStyles({})

    return {
      element: this.element,
      ...this.baseInit(),
      classes,
      styles
    }
  }
}