import { PropType } from 'vue'
import { WindowAlignmentType, WindowAnimationOriginType } from './props.type'

export const props = {
  // Values
  persistent: Boolean,
  inDom: Boolean,
  flash: Boolean,

  // Event
  beforeOpening: Function as PropType<(status: boolean) => boolean>,
  preparation: Function,
  opening: Function,

  // Status
  disabled: Boolean,

  // Options
  adaptive: String,
  rounded: String,
  autoClose: Boolean,
  alignment: String as PropType<WindowAlignmentType>,
  animationOrigin: String as PropType<WindowAnimationOriginType>,
  fullscreen: Boolean,

  contextmenu: Boolean,
  axis: String,
  indent: Number,
  width: [Number, String],
  height: [Number, String]
}

export default {
  props
}
