import { computed, ComputedRef, Ref, ref } from 'vue'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { props } from './props'
import {
  AssociativeType,
  ComponentClassesType,
  ComponentStylesType
} from '../types'

export type ProgressSetupType = {
  element: Ref<HTMLElement | undefined>
  tag: ComputedRef<string>
  name: ComputedRef<string>
  nameDesign: ComputedRef<string>
  baseClass: ComputedRef<string>
  classes: ComputedRef<ComponentClassesType>
  styles: ComputedRef<ComponentStylesType>
}

export abstract class ProgressComponentAbstract extends ComponentAbstract {
  protected readonly instruction = props as AssociativeType
  protected readonly element = ref<HTMLElement | undefined>()

  setup (): ProgressSetupType {
    const classes = this.getClasses({})
    const styles = this.getStyles({})

    return {
      element: this.element,
      tag: this.tag,
      ...this.baseInit(),
      classes,
      styles
    }
  }

  public readonly tag = computed(() => this.props.type !== 'linear' ? 'svg' : 'div')
}
