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
  isCounter: ComputedRef<boolean>
  isMax: ComputedRef<boolean>
  isMessage: ComputedRef<boolean>
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
      isCounter: this.isCounter,
      isMax: this.isMax,
      isMessage: this.isMessage
    }
  }

  protected readonly isCounter = computed<boolean>(() => typeof this.props.counter === 'number')
  protected readonly isMax = computed<boolean>(() => typeof this.props.maxlength === 'number' && this.props.maxlength > 0)

  protected readonly isMessage = computed<boolean>(() => {
    return this.isCounter.value ||
      isFilled(this.props.helperMessage) ||
      isFilled(this.props.validationMessage)
  })
}
