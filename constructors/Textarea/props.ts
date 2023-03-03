import { PropType } from 'vue'
import { InputValidityType } from '../Input/types'

export const props = {
  // Values
  text: [Number, String],
  icon: [Object, String],
  iconTrailing: [Object, String],
  placeholder: String,
  name: String,
  value: [Number, String],
  detail: [Object],

  // Input
  required: Boolean,
  autofocus: Boolean,
  inputmode: String,
  spellcheck: Boolean,

  minlength: Number,
  maxlength: Number,

  input: Object,

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
  rounded: String,
  width: [Number, String],
  height: [Number, String],
  field: Object
}

export default {
  props
}
