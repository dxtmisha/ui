import { ref } from 'vue'

export type MotionAxisSlide = {
  name: string
  element: HTMLDivElement
  status?: 'hide' | 'preparation' | 'selected'
}

export class MotionAxisSlides {
  private elements = ref<MotionAxisSlide[]>([])

  get (): MotionAxisSlide[] {
    return this.elements.value
  }

  getByName (name: string): MotionAxisSlide | undefined {
    return this.elements.value.find(item => item.name === name)
  }

  getFirst (): MotionAxisSlide | undefined {
    return this.get()?.[0]
  }

  getIndex (name: string): number {
    return this.elements.value.findIndex(item => item.name === name)
  }

  add (name: string, element: HTMLDivElement): this {
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
