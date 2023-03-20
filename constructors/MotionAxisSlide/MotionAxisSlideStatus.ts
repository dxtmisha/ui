import { computed, Ref } from 'vue'

export type MotionAxisSlideStatusType = 'hide' | 'preparation' | 'selected'

export class MotionAxisSlideStatus {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly name?: Ref<string>,
    private readonly selected?: Ref<string>,
    private readonly preparation?: Ref<string>
  ) {
  }

  readonly item = computed<MotionAxisSlideStatusType>(() => {
    if (this.name?.value === this.selected?.value) {
      return 'selected'
    } else if (this.name?.value === this.preparation?.value) {
      return 'preparation'
    } else {
      return 'hide'
    }
  })

  readonly show = computed<boolean>(() => this.item.value !== 'hide')

  isShow () {
    return this.show.value
  }

  get (): MotionAxisSlideStatusType {
    return this.item.value
  }
}
