import { NumberOrStringType } from '../types'
import { ref } from 'vue'

export type MotionAxisSlide = {
  name: NumberOrStringType
  element: HTMLDivElement
}

export class MotionAxisSlides {
  private elements = ref<MotionAxisSlide[]>([])

  get (): MotionAxisSlide[] {
    return this.elements.value
  }

  getByName (name: NumberOrStringType): MotionAxisSlide | undefined {
    return this.elements.value.find(item => item.name === name)
  }

  getIndex (name: NumberOrStringType): number {
    return this.elements.value.findIndex(item => item.name === name)
  }

  add (name: NumberOrStringType, element: HTMLDivElement): this {
    this.elements.value.push({
      name,
      element
    })

    return this
  }

  reset (): this {
    this.elements.value = []
    return this
  }
}
