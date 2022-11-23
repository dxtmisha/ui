import { ComputedRef, Ref } from 'vue'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { props } from './props'
import {
  AssociativeType,
  ComponentClassesType,
  ComponentStylesType
} from '../types'

export type ButtonSetupType = {
  element: Ref<HTMLElement | undefined>
  name: ComputedRef<string>
  nameDesign: ComputedRef<string>
  baseClass: ComputedRef<string>
  classes: ComputedRef<ComponentClassesType>
  styles: ComputedRef<ComponentStylesType>
}

export abstract class ButtonComponentAbstract extends ComponentAbstract {
  protected readonly instruction = props as AssociativeType

  setup (): ButtonSetupType {
    const classes = this.getClasses({})
    const styles = this.getStyles({})

    return {
      ...this.baseInit(),
      classes,
      styles
    }
  }
}
