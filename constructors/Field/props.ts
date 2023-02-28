export const props = {
  // Values
  text: [Number, String],
  icon: [Object, String],
  iconTrailing: [Object, String],
  prefix: [Number, String],
  suffix: [Number, String],
  value: undefined,
  detail: [Object],

  // Message
  counter: Number,
  maxlength: Number,
  helperMessage: String,
  validationMessage: String,

  // Status
  turn: Boolean,
  focus: Boolean,
  selected: Boolean,
  readonly: Boolean,
  disabled: Boolean,
  disabledPrevious: Boolean,
  disabledNext: Boolean,

  // Options
  palette: String,
  appearance: String,
  arrow: Boolean,
  align: String,
  rounded: String,
  width: [Number, String],
  height: [Number, String],
  required: Boolean,
  cancel: [Boolean, String],
  ripple: Boolean,

  // Icon
  iconCancel: String,
  iconNext: String,
  iconPrevious: String
}

export default {
  props
}
