import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { props } from './props'
import {
  AssociativeType,
  ComponentAssociativeType,
  ComponentBaseType
} from '../types'

export type InputClassesType = {
  main: ComponentAssociativeType
}
export type InputSetupType = ComponentBaseType

export abstract class InputComponentAbstract extends ComponentAbstract {
  static readonly instruction = props as AssociativeType
  static readonly emits = [
    'on-input',
    'on-change',
    'update:value',
    'update:modelValue'
  ] as string[]

  constructor (
    protected readonly props: AssociativeType & object,
    protected readonly context: AssociativeType & object
  ) {
    super(props, context)
  }

  setup (): InputSetupType {
    const classes = this.getClasses<InputClassesType>()
    const styles = this.getStyles()

    return {
      ...this.getBasic(),
      classes,
      styles
    }
  }
}
