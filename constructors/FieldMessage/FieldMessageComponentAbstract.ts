import { computed } from 'vue'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { isFilled } from '../../functions/data'
import { props } from './props'

import { AssociativeType } from '../types'
import { FieldClassesType, FieldSetupType } from './types'

export abstract class FieldMessageComponentAbstract extends ComponentAbstract {
  static readonly instruction = props as AssociativeType

  setup (): FieldSetupType {
    const classes = this.getClasses<FieldClassesType>()

    return {
      ...this.getBasic(),
      classes,
      isCounter: this.isCounter,
      isMax: this.isMax,
      isMessage: this.isMessage
    }
  }

  protected readonly isCounter = computed<boolean>(
    () => typeof this.props.counter === 'number' && (this.props.counter > 0 || this.isMax.value)
  )

  protected readonly isMax = computed<boolean>(
    () => typeof this.props.maxlength === 'number' && this.props.maxlength > 0
  )

  protected readonly isMessage = computed<boolean>(() => {
    return this.isCounter.value ||
      isFilled(this.props.helperMessage) ||
      isFilled(this.props.validationMessage)
  })
}
