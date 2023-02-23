export const props = {
  // Values
  text: [Number, String],
  icon: [Object, String],
  iconTrailing: [Object, String],
  to: String,
  value: [Number, Object, String],
  detail: [Object],

  // Status
  turn: Boolean,
  hide: Boolean,
  selected: Boolean,
  readonly: Boolean,
  progress: Boolean,
  disabled: Boolean,
  dragged: Boolean,

  // Options
  tag: String,
  palette: String,
  appearance: String,
  align: String,
  adaptive: String,
  rounded: String,
  width: [Number, String],
  height: [Number, String],
  dense: Boolean,
  lowercase: Boolean,
  ellipsis: Boolean,
  ripple: Boolean
}

export default {
  props
}
