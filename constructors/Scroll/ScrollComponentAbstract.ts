import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { props } from './props'
import {
  AssociativeType,
  ComponentBaseType
} from '../types'

export type ScrollSetupType = ComponentBaseType

export abstract class ScrollComponentAbstract extends ComponentAbstract {
  static readonly instruction = props as AssociativeType

  setup (): ScrollSetupType {
    const classes = this.getClasses()
    const styles = this.getStyles()

    return {
      ...this.getBasic(),
      classes,
      styles
    }
  }
}
