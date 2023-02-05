import { PropType } from 'vue'
import { InputValidityType } from '../Input/types'

export const props = {
  // Values
  detail: [Object],
  icon: [Object, String],
  name: String,
  required: Boolean,
  text: [Number, String],
  value: [Boolean, Number, String],
  valueDefault: {
    type: String,
    default: '1'
  },

  // Input
  input: Object,

  // Message
  helperMessage: String,
  validationCode: [Object, String] as PropType<string | InputValidityType>,
  validationMessage: String,

  // On
  modelValue: undefined,
  on: {
    type: Object,
    default: {}
  },

  // Status
  disabled: Boolean,
  readonly: Boolean,

  // Options
  palette: String,
  right: Boolean,
  ripple: Boolean
}

export default {
  props
}
