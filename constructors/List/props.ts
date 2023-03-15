export const props = {
  // Values
  icon: [Object, String],
  list: [Array, Object],
  rename: Object,
  value: undefined,

  filter: String,
  filterIndex: [Array, String],

  sort: String,
  desc: Boolean,

  checkbox: Boolean,
  checkboxRight: Boolean,

  // Status
  readonly: Boolean,
  disabled: Boolean,

  // Options
  tag: String,
  palette: String,
  appearance: String,
  adaptive: String,
  rounded: String,
  height: [Number, String],
  border: Boolean,
  dense: Boolean,
  ripple: Boolean,
  item: Object
}

export default {
  props
}
