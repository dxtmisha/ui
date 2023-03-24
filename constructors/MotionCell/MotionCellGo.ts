import { ref, Ref } from 'vue'
import { AssociativeType } from '../types'

export class MotionCellGo {
  private readonly preparation = ref(false)
  private readonly start = ref(false)

  private timeout?: number

  getClasses (): AssociativeType<Ref<boolean>> {
    return {
      'is-preparation': this.preparation,
      'is-start': this.start
    }
  }

  go (): void {
    this.preparation.value = true
    requestAnimationFrame(() => {
      this.start.value = true
      this.toReset()
    })
  }

  reset (): void {
    if (this.start.value) {
      this.preparation.value = false
      this.start.value = false
    }
  }

  private toReset () {
    this.timeout = setTimeout(() => this.reset(), 1024)
  }
}
