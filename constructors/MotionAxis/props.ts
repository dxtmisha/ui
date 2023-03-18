import { PropType } from 'vue'
import { MotionAxisAxisType, MotionAxisTransitionType } from './props.type'

export const props = {
  // Values

  // Status
  selected: String,

  // Options
  axis: {
    type: String as PropType<MotionAxisAxisType>,
    default: 'x'
  },
  transition: {
    type: String as PropType<MotionAxisTransitionType>,
    default: 'auto'
  }
}

export default {
  props
}
