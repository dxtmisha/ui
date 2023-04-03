import { nextTick, ref } from 'vue'

import { MotionTransformStatus } from './MotionTransformStatus'
import { WindowHook } from '../Window/WindowHook'

export class MotionTransformOpen {
  readonly item = ref<boolean>(false)

  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly status: MotionTransformStatus,
    private readonly hook: WindowHook
  ) {
  }

  async toggle (open: boolean): Promise<this> {
    if (
      open !== this.item.value &&
      await this.hook.callbackBeforeOpening(this.item.value)
    ) {
      /*
      if (open) {
        this.restart()
        this.status.set('preparation')
        this.item.value = open
        this.first.value = open

        await nextTick()
        await this.hook.callbackPreparation(this.item.value)
        await this.watchPosition()

        requestAnimationFrame(async () => {
          await this.hook.callbackOpening(this.item.value)

          this.eventItem.go()
          this.status.set(this.flash.isHide() ? 'flash' : 'open')
        })
      } else {
        this.eventItem.stop()

        if (this.flash.isOpen()) {
          await this.toClose()
        } else {
          this.status.set('hide')
        }
      }
      */
    }

    return this
  }
}
