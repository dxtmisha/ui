export const props = {
  // Values
  beforeOpening: Function,
  opening: Function,

  // Status
  disabled: Boolean,

  // Options
  adaptive: String,
  autoClose: Boolean,
  axis: String,
  indent: Number,
  inDom: Number,
  persistent: Boolean,
  shape: String,
  width: [Number, String]
}

export default {
  props
}
