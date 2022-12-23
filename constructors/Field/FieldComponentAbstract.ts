import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { props } from './props'
import {
  AssociativeType,
  ComponentBaseType
} from '../types'
import { computed, ComputedRef } from 'vue'

export type FieldSetupType = ComponentBaseType & {
  left: ComputedRef<string>,
  right: ComputedRef<string>
}

export abstract class FieldComponentAbstract extends ComponentAbstract {
  static readonly instruction = props as AssociativeType
  static readonly emits = [
    'on-previous',
    'on-next',
    'on-cancel',
    'on-trailing'
  ] as string[]

  setup (): FieldSetupType {
    const classes = this.getClasses()
    const styles = this.getStyles()

    return {
      ...this.getBasic(),
      classes,
      styles,
      left: this.left,
      right: this.right
    }
  }

  protected readonly left = computed<string>(() => '0px')
  protected readonly right = computed<string>(() => '0px')
}
