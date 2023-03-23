import { PropType } from 'vue'
import { MotionAxisAnimationTypeType } from '../MotionAxis/props.type'

export const props = {
  // Values

  // Status
  selected: String,

  // Options
  animationType: String as PropType<MotionAxisAnimationTypeType>
}

export default {
  props
}
