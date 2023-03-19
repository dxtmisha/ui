import { MotionAxisSlideType, MotionAxisSlides } from './MotionAxisSlides'
import { MotionAxisSelected } from './MotionAxisSelected'
import { computed, ref, watch } from 'vue'
import { AssociativeType } from '../types'

export type MotionAxisStatusType = {
  element: MotionAxisSlideType
  status?: 'hide' | 'preparation' | 'selected'
}

export class MotionAxisStatus {
  private preparation = ref<string>('')

  constructor (
    private readonly slides: MotionAxisSlides,
    private readonly selected: MotionAxisSelected
  ) {
    watch(this.selected.item, (element: string, preparation: string) => {
      this.preparation.value = preparation
    })
  }

  readonly item = computed<AssociativeType<MotionAxisStatusType>>(() => {
    const data = {} as AssociativeType<MotionAxisStatusType>
    const selected = this.selected.get()

    this.slides.get().forEach(element => {
      data[element.name] = {
        element,
        status: selected === element.name
          ? 'selected'
          : this.preparation.value === element.name
            ? 'preparation'
            : 'hide'
      }
    })

    return data
  })

  get (): AssociativeType<MotionAxisStatusType> {
    return this.item.value
  }

  reset (): this {
    this.preparation.value = ''
    return this
  }
}
