import { computed, nextTick, ref, Ref, watch } from 'vue'
import { MotionAxisSlideCoordinates } from './MotionAxisSlideCoordinates'

export type MotionAxisSlideStatusType =
  'hide' |
  'preparation' |
  'selected' |
  'close'

export class MotionAxisSlideStatus {
  private timeout?: number
  readonly item = ref<MotionAxisSlideStatusType>('hide')

  constructor (
    private readonly coordinates: MotionAxisSlideCoordinates,
    private readonly name: Ref<string>,
    private readonly selected: Ref<string>
  ) {
    watch(this.selected, async () => {
      if (this.is() && this.item.value !== 'selected') {
        this.toPreparation()
      } else if (this.item.value !== 'hide') {
        this.toClose()
      }
    })

    if (this.is()) {
      this.toSelected()
    }
  }

  readonly show = computed<boolean>(() => this.item.value !== 'hide')

  is () {
    return this.name.value === this.selected.value
  }

  isShow () {
    return this.show.value
  }

  get (): MotionAxisSlideStatusType {
    return this.item.value
  }

  reset (): this {
    if (this.item.value === 'close') {
      clearTimeout(this.timeout)
      this.item.value = 'hide'
    }

    return this
  }

  private toPreparation (): void {
    requestAnimationFrame(async () => {
      this.item.value = 'preparation'

      await nextTick()
      requestAnimationFrame(() => this.toSelected())
    })
  }

  private toSelected (): void {
    this.item.value = 'selected'
  }

  private toClose (): void {
    this.coordinates.update()

    this.item.value = 'close'
    this.timeout = setTimeout(() => this.reset(), 1024)
  }
}
