export const props = {
  // Values
  counter: Number,
  detail: [Object],
  helperMessage: String,
  icon: [Object, String],
  iconTrailing: [Object, String],
  maxlength: Number,
  prefix: [Number, String],
  required: Boolean,
  suffix: [Number, String],
  text: [Number, String],
  validationMessage: String,
  value: undefined,

  // Status
  disabled: Boolean,
  disabledPrevious: Boolean,
  disabledNext: Boolean,
  dragged: Boolean,
  focus: Boolean,
  progress: Boolean,
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
  iconArrowLeft: String,
  iconArrowRight: String,
  iconCancel: String
}

export default {
  props
}
