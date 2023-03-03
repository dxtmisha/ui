import { PropType } from 'vue'
import { ProgressIndeterminateType, ProgressTypeType } from './props.type'

export const props = {
  // Values
  value: {
    type: Number,
    default: null
  },
  max: {
    type: Number,
    default: 100
  },

  // Status
  visible: Boolean,

  // Options
  type: {
    type: String as PropType<ProgressTypeType>,
    default: 'linear'
  },
  indeterminate: {
    type: String as PropType<ProgressIndeterminateType>,
    default: 'type2'
  },
  inverse: Boolean,
  bottom: Boolean,
  delay: {
    type: Number,
    default: 480
  },
  dense: Boolean
}
