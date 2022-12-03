import { PropType } from 'vue'
import { ProgressIndeterminateType, ProgressTypeType } from './props.type'

export const props = {
  // Values
  max: {
    type: Number,
    default: 100
  },
  value: {
    type: Number,
    default: null
  },

  // Status
  visible: Boolean,

  // Options
  bottom: Boolean,
  delay: {
    type: Number,
    default: 480
  },
  dense: Boolean,
  indeterminate: {
    type: String as PropType<ProgressIndeterminateType>,
    default: 'type1'
  },
  inverse: Boolean,
  type: {
    type: String as PropType<ProgressTypeType>,
    default: 'linear'
  }
}
