import { MotionAxisStatus } from './MotionAxisStatus'
import { ref, watchEffect } from 'vue'
import { MotionAxisCoordinates } from './MotionAxisCoordinates'

export type MotionAxisSwitchTypeType = 'static' | 'preparation' | 'switch'

export class MotionAxisSwitch {
  private readonly value = ref<MotionAxisSwitchTypeType>('static')

  constructor (
    private readonly status: MotionAxisStatus,
    private readonly coordinates: MotionAxisCoordinates
  ) {
    watchEffect(async () => {
      if (this.status.getPreparation() === '') {
        this.value.value = 'static'
        this.coordinates.resize()
      } else {
        this.coordinates.update()
        // this.value.value = 'preparation'
        // this.value.value = 'switch'
      }
    })
  }

  end (): this {
    this.status.reset()
    return this
  }
}
