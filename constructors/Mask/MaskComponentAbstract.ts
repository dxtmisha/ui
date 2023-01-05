import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { props } from './props'
import { AssociativeType, ComponentBaseType } from '../types'

export type MaskSetupType = ComponentBaseType

export abstract class MaskComponentAbstract extends ComponentAbstract {
  static readonly instruction = props as AssociativeType
  static readonly emits = [
    'on-change',
    'on-blur',
    'on-focus',
    'on-input'
  ] as string[]

  setup (): MaskSetupType {
    const classes = this.getClasses()
    const styles = this.getStyles()

    return {
      ...this.getBasic(),
      classes,
      styles
    }
  }
}
