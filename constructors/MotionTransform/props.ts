import { PropType } from 'vue'
import { MotionTransformAdaptive } from './props.type'

export const props = {
  // Values
  ignore: String,
  ignoreById: String,

  // Event
  beforeOpening: Function as PropType<(status: boolean) => boolean>,
  preparation: Function,
  opening: Function,

  // Status
  open: Boolean,

  // Options
  adaptive: String as PropType<MotionTransformAdaptive>,
  bottom: Boolean,
  click: Boolean,
  autoClose: Boolean,
  animationShow: Boolean,

  // Icon
  iconBack: String
}

export default {
  props
}
