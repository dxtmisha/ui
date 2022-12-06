import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { props } from './props'
import {
  AssociativeType,
  ComponentBaseType
} from '../types'

export type WindowSetupType = ComponentBaseType

export abstract class WindowComponentAbstract extends ComponentAbstract {
  static readonly instruction = props as AssociativeType
  static readonly emits = ['on-open', 'on-close'] as string[]

  setup (): WindowSetupType {
    const classes = this.getClasses({
      main: {}
    })
    const styles = this.getStyles()

    return {
      ...this.getBasic(),
      classes,
      styles
    }
  }
}
