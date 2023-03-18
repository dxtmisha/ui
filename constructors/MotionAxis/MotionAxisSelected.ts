import { computed, ref, Ref } from 'vue'
import { MotionAxisSlides } from './MotionAxisSlides'

export class MotionAxisSelected {
  private readonly value = ref<string>()

  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly slides: MotionAxisSlides,
    private readonly selected: Ref<string>
  ) {
  }

  readonly item = computed<string>(
    () => this.value.value || this.selected.value || this.slides.getFirst()?.name || ''
  )

  get (): string {
    return this.item.value
  }

  set (value: string): this {
    this.value.value = value
    return this
  }
}
