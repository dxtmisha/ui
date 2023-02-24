import { PropType } from 'vue'
import { InputValidityType } from '../Input/types'

export const props = {
  // Values
  text: [Number, String],
  icon: [Object, String],
  name: String,
  value: [Boolean, Number, String],
  valueDefault: {
    type: String,
    default: '1'
  },
  detail: [Object],

  // Input
  required: Boolean,
  input: Object,

  // Message
  helperMessage: String,
  validationMessage: String,
  validationCode: [Object, String] as PropType<string | InputValidityType>,

  // On
  modelValue: undefined,
  on: {
    type: Object,
    default: {}
  },

  // Status
  readonly: Boolean,
  disabled: Boolean,

  // Options
  palette: String,
  right: Boolean,
  ripple: Boolean
}

export default {
  props
}
