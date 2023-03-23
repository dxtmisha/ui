import { computed } from 'vue'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { props } from './props'

import { AssociativeType } from '../types'
import { MotionAxisSetupType } from './types'

export abstract class MotionAxisComponentAbstract extends ComponentAbstract<HTMLDivElement> {
  static readonly instruction = props as AssociativeType
  static readonly emits = ['on-status']

  setup (): MotionAxisSetupType {
    const classes = this.getClasses()

    return {
      ...this.getBasic(),
      classes,

      slideBind: this.slideBind,

      onStatus: (event: AssociativeType) => this.context.emit('on-status', event)
    }
  }

  protected readonly selected = computed<string>(() => {
    return this.props.selected || Object.keys(this.context.slots)[0]
  })

  protected readonly slideBind = computed<AssociativeType>(() => {
    return {
      selected: this.selected.value,
      animationType: this.props.animationType
    }
  })
}
