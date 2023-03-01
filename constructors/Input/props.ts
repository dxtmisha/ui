import { PropType } from 'vue'
import { InputMatchType, InputTypeType, InputValidityType } from './types'

export const props = {
  // Values
  text: [Number, String],
  icon: [Object, String],
  iconTrailing: [Object, String],
  prefix: [Number, String],
  suffix: [Number, String],
  placeholder: String,
  name: String,
  value: [Number, String],
  detail: [Object],

  // Input
  type: {
    type: String as PropType<InputTypeType>,
    default: 'text'
  },
  required: Boolean,
  mask: [Object, String],
  pattern: String,

  autofocus: Boolean,
  autocomplete: {
    type: String,
    default: 'off'
  },
  inputmode: String,
  spellcheck: Boolean,

  minlength: Number,
  maxlength: Number,

  step: Number,
  min: [Number, String],
  max: [Number, String],

  input: Object,
  inputMatch: [Object, String] as PropType<InputMatchType>,

  // Message
  counter: Boolean,
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
  selected: Boolean,
  readonly: Boolean,
  disabled: Boolean,

  // Options
  palette: String,
  appearance: String,
  arrow: Boolean,
  align: String,
  rounded: String,
  width: [Number, String],
  height: [Number, String],
  cancel: [Boolean, String],
  ripple: Boolean,
  field: Object,

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
