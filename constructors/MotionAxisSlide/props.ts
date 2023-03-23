import { PropType } from 'vue'

import { NumberOrStringType } from '../types'
import { MotionAxisAnimationTypeType } from '../MotionAxis/props.type'

export const props = {
  // Values
  name: [Number, String] as PropType<NumberOrStringType>,

  // Status
  selected: String,

  // Options
  animationType: String as PropType<MotionAxisAnimationTypeType>
}

export default {
  props
}
