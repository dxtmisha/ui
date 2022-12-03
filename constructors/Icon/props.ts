import { PropType } from 'vue'
import { IconIndeterminateType, IconSizeType } from './props.type'

export const props = {
  // Values
  icon: [String, Object],
  iconActive: [String, Object],

  // Status
  active: Boolean,
  disabled: Boolean,
  hide: Boolean,
  turn: Boolean,

  // Options
  animationShow: Boolean,
  animationType: String as PropType<IconIndeterminateType>,
  background: Boolean,
  inEnd: Boolean,
  size: [Number, String] as PropType<IconSizeType>
}
