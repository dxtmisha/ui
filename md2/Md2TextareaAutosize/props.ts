import { PropType } from 'vue'
import { Md2TextareaAutosizeHeightType } from './props.type'

export const props = {
  // Values
  value: String,
  modelValue: undefined,
  on: {
    type: Object,
    default: {}
  },

  // Options
  height: [Number, String] as PropType<Md2TextareaAutosizeHeightType>
}
