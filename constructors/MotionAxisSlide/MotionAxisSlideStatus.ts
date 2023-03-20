import { computed, ref, Ref, watchEffect } from 'vue'
import { MotionAxisSlideCoordinates } from './MotionAxisSlideCoordinates'

export type MotionAxisSlideStatusType = 'hide' | 'preparation' | 'selected'

export class MotionAxisSlideStatus {
  readonly item = ref<MotionAxisSlideStatusType>('hide')

  constructor (
    private readonly coordinates: MotionAxisSlideCoordinates,
    private readonly name: Ref<string>,
    private readonly selected: Ref<string>,
    private readonly preparation: Ref<string>
  ) {
    watchEffect(() => {
      if (this.name.value === this.selected.value) {
        requestAnimationFrame(() => {
          this.item.value = 'selected'
        })
      } else if (this.name.value === this.preparation.value) {
        this.coordinates.update()
        this.item.value = 'preparation'
      } else {
        this.item.value = 'hide'
      }
    })
  }

  readonly show = computed<boolean>(() => this.item.value !== 'hide')

  isShow () {
    return this.show.value
  }

  get (): MotionAxisSlideStatusType {
    return this.item.value
  }
}
