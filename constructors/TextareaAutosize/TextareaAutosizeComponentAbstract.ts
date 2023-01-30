import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { props } from './props'
import { AssociativeType, ComponentBaseType } from '../types'
import { InputClassesType } from '../Input/types'

export type TextareaAutosizeSetupType = ComponentBaseType

export abstract class TextareaAutosizeComponentAbstract extends ComponentAbstract<HTMLTextAreaElement> {
  static readonly instruction = props as AssociativeType
  static readonly emits = [
    'on-input',
    'on-change',
    'update:value',
    'update:modelValue'
  ] as string[]

  setup (): TextareaAutosizeSetupType {
    const classes = this.getClasses<InputClassesType>()
    const styles = this.getStyles()

    return {
      ...this.getBasic(),
      classes,
      styles
    }
  }
}
