import { ref } from 'vue'
import { MotionAxisTransitionType } from '../MotionAxis/props.type'

export class MotionAxisToTransition {
  readonly item = ref<MotionAxisTransitionType | undefined>()

  get (): MotionAxisTransitionType | undefined {
    return this.item.value
  }

  set (value?: MotionAxisTransitionType): this {
    this.item.value = value
    return this
  }
}
