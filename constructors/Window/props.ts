import { PropType } from 'vue'
import { WindowAlignmentType, WindowAnimationOriginType } from './props.type'

export const props = {
  // Values
  beforeOpening: Function as PropType<(status: boolean) => boolean>,
  opening: Function,
  contextmenu: Boolean,

  // Status
  disabled: Boolean,

  // Options
  alignment: String as PropType<WindowAlignmentType>,
  animationOrigin: String as PropType<WindowAnimationOriginType>,
  adaptive: String,
  autoClose: Boolean,
  axis: String,
  fullscreen: Boolean,
  height: [Number, String],
  indent: Number,
  inDom: Boolean,
  rounded: String,
  persistent: Boolean,
  width: [Number, String]
}

export default {
  props
}
