export const props = {
  // Values
  text: [Number, String],
  textShort: [Number, String],
  textHighlight: [Number, String],
  icon: [Object, String],
  iconTrailing: [Object, String],
  thumbnail: [Object, String],
  prefix: [Number, String],
  suffix: [Number, String],
  description: String,
  value: [Number, Object, String],
  detail: [Object],
  to: String,

  checkbox: Boolean,
  checkboxRight: Boolean,

  // Status
  turn: Boolean,
  focus: Boolean,
  highlight: Boolean,
  selected: Boolean,
  readonly: Boolean,
  progress: Boolean,
  disabled: Boolean,

  // Options
  tag: String,
  palette: String,
  overlay: [Boolean, String],
  appearance: String,
  adaptive: String,
  rounded: String,
  height: [Number, String],
  border: Boolean,
  dense: Boolean,
  ripple: Boolean
}

export default {
  props
}
