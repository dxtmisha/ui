export const props = {
  // Values
  beforeOpening: Function,
  opening: Function,
  contextmenu: Boolean,

  // Status
  disabled: Boolean,

  // Options
  alignment: String,
  animationOrigin: String,
  adaptive: String,
  autoClose: Boolean,
  axis: String,
  height: [Number, String],
  indent: Number,
  inDom: Number,
  rounded: String,
  persistent: Boolean,
  width: [Number, String]
}

export default {
  props
}
