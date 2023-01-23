import { PropType } from 'vue'
import { InputTypeType } from './types'

export const props = {
  // Values
  detail: [Object],
  icon: [Object, String],
  iconTrailing: [Object, String],
  mask: [Object, String],
  name: String,
  prefix: [Number, String],
  required: Boolean,
  suffix: [Number, String],
  text: [Number, String],
  value: [Number, String],

  // Input
  autocomplete: {
    type: String,
    default: 'off'
  },
  autofocus: Boolean,
  inputmode: String,
  step: Number,
  min: [Number, String],
  max: [Number, String],
  minlength: Number,
  maxlength: Number,
  pattern: String,
  placeholder: String,
  spellcheck: Boolean,
  input: Object,

  // Message
  counter: Number,
  helperMessage: String,
  validationCode: [Object],
  validationMessage: [Boolean, String],

  // On
  modelValue: undefined,
  on: {
    type: Object,
    default: {}
  },

  // Status
  disabled: Boolean,
  disabledPrevious: Boolean,
  disabledNext: Boolean,
  focus: Boolean,
  readonly: Boolean,
  selected: Boolean,

  // Options
  align: String,
  appearance: String,
  arrow: Boolean,
  cancel: [Boolean, String],
  height: [Number, String],
  palette: String,
  ripple: Boolean,
  rounded: String,
  type: {
    type: String as PropType<InputTypeType>,
    default: 'text'
  },
  width: [Number, String],

  // Icon
  iconCancel: String,
  iconNext: String,
  iconPrevious: String,
  iconVisibility: String,
  iconVisibilityOff: String
}

export default {
  props
}
