import { PropType } from 'vue'
import { IconIndeterminateType, IconSizeType } from './props.type'

export const props = {
  // Values
  icon: [String, Object],
  iconActive: [String, Object],

  // Status
  active: Boolean,
  turn: Boolean,
  hide: Boolean,
  disabled: Boolean,

  // Options
  size: [Number, String] as PropType<IconSizeType>,
  background: [Boolean, String],
  backgroundActive: Boolean,
  animationType: String as PropType<IconIndeterminateType>,
  animationShow: Boolean,
  inEnd: Boolean
}
