export const props = {
  // Values
  description: String,
  detail: [Object],
  icon: [Object, String],
  iconTrailing: [Object, String],
  highlight: String,
  prefix: [Number, String],
  suffix: [Number, String],
  text: [Number, String],
  textShort: [Number, String],
  thumbnail: [Object, String],
  to: String,
  value: [Number, Object, String],

  // Status
  disabled: Boolean,
  progress: Boolean,
  readonly: Boolean,
  selected: Boolean,
  turn: Boolean,

  // Options
  adaptive: String,
  appearance: String,
  background: String,
  border: Boolean,
  dense: Boolean,
  height: [Number, String],
  palette: String,
  rounded: String,
  tag: String,
  ripple: Boolean
}

export default {
  props
}
