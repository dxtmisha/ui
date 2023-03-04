import { PropType } from 'vue'
import { WindowAlignmentType, WindowAnimationOriginType } from './props.type'

export const props = {
  // Values
  beforeOpening: Function as PropType<(status: boolean) => boolean>,
  opening: Function,
  contextmenu: Boolean,
  persistent: Boolean,
  inDom: Boolean,

  // Status
  disabled: Boolean,

  // Options
  adaptive: String,
  rounded: String,
  autoClose: Boolean,
  alignment: String as PropType<WindowAlignmentType>,
  animationOrigin: String as PropType<WindowAnimationOriginType>,
  fullscreen: Boolean,

  axis: String,
  indent: Number,
  width: [Number, String],
  height: [Number, String]
}

export default {
  props
}
