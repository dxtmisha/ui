import { PropType } from 'vue'
import { InputValidityType } from '../Input/types'

export const props = {
  // Values
  detail: [Object],
  icon: [Object, String],
  iconTrailing: [Object, String],
  name: String,
  required: Boolean,
  text: [Number, String],
  value: [Number, String],

  // Input
  autofocus: Boolean,
  inputmode: String,
  minlength: Number,
  maxlength: Number,
  placeholder: String,
  spellcheck: Boolean,
  input: Object,

  // Message
  counter: Boolean,
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
  selected: Boolean,

  // Options
  appearance: String,
  height: [Number, String],
  palette: String,
  rounded: String,
  width: [Number, String],
  field: Object
}

export default {
  props
}
