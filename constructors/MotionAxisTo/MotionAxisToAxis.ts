import { ref } from 'vue'
import { MotionAxisAxisType } from '../MotionAxis/props.type'

export class MotionAxisToAxis {
  readonly item = ref<MotionAxisAxisType | undefined>()

  get (): MotionAxisAxisType | undefined {
    return this.item.value
  }

  set (value?: MotionAxisAxisType): this {
    this.item.value = value
    return this
  }
}
