import { computed, ComputedRef } from 'vue'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { props } from './props'
import {
  AssociativeType,
  ComponentAssociativeType,
  ComponentBaseType
} from '../types'
import { isFilled } from '../../functions'

export type FieldClassesType = {
  main: ComponentAssociativeType
  info: ComponentAssociativeType
  helper: ComponentAssociativeType
  validation: ComponentAssociativeType
  counter: ComponentAssociativeType
}
export type FieldSetupType = ComponentBaseType & {
  classes: ComputedRef<FieldClassesType>
  ifCounter: ComputedRef<boolean>
  ifMax: ComputedRef<boolean>
  ifMessage: ComputedRef<boolean>
}

export abstract class FieldMessageComponentAbstract extends ComponentAbstract {
  static readonly instruction = props as AssociativeType

  setup (): FieldSetupType {
    const classes = this.getClasses<FieldClassesType>()
    const styles = this.getStyles()

    return {
      ...this.getBasic(),
      classes,
      styles,
      ifCounter: this.ifCounter,
      ifMax: this.ifMax,
      ifMessage: this.ifMessage
    }
  }

  protected readonly ifCounter = computed<boolean>(() => typeof this.refs.counter === 'number')
  protected readonly ifMax = computed<boolean>(() => typeof this.refs.maxlength === 'number' && this.refs.maxlength > 0)

  protected readonly ifMessage = computed<boolean>(() => {
    return this.ifCounter.value ||
      isFilled(this.refs.helperMessage) ||
      isFilled(this.refs.validationMessage)
  })
}
