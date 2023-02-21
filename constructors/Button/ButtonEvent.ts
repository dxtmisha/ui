import { Ref } from 'vue'
import { useRouter } from 'vue-router'

import { EventItem } from '../../classes/EventItem'
import { ButtonValue } from './ButtonValue'
import { UseEnabled } from '../Use/UseEnabled'
import { CallbackEmitType } from '../types'

export class ButtonEvent {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly emit: CallbackEmitType,
    private readonly value: ButtonValue,
    private readonly enabled: UseEnabled,
    private readonly to?: Ref<string | undefined>
  ) {
  }

  on (type = 'on-click' as string): this {
    this.emit(type, {
      type,
      detail: this.value.getDetail(),
      value: this.value.get()
    })

    return this
  }

  onClick (event: MouseEvent): void {
    if (!this.enabled.is()) {
      EventItem.stopPropagation(event)
    } else if (this.isTrailing(event)) {
      EventItem.stopPropagation(event)
      this.on('on-trailing')
    } else if (this.to?.value) {
      this.toRouter().then()
    } else {
      this.on()
    }
  }

  private isTrailing (event: MouseEvent): boolean {
    return !!(event.target as HTMLElement)?.closest('.is-trailing')
  }

  private toRouter () {
    return useRouter().push(this.to?.value as string)
  }
}
