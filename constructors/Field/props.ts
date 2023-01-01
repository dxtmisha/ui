export const props = {
  // Values
  detail: [Object],
  icon: [Object, String],
  iconTrailing: [Object, String],
  prefix: [Number, String],
  required: Boolean,
  suffix: [Number, String],
  text: [Number, String],
  value: undefined,

  // Message
  counter: Number,
  helperMessage: String,
  maxlength: Number,
  validationMessage: String,

  // Status
  disabled: Boolean,
  disabledPrevious: Boolean,
  disabledNext: Boolean,
  focus: Boolean,
  readonly: Boolean,
  selected: Boolean,
  turn: Boolean,

  // Options
  align: String,
  appearance: String,
  arrow: Boolean,
  cancel: [Boolean, String],
  height: [Number, String],
  palette: String,
  ripple: Boolean,
  rounded: String,
  width: [Number, String],

  // Icon
  iconCancel: String,
  iconNext: String,
  iconPrevious: String
}

export default {
  props
}
