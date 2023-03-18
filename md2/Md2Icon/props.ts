import { PropType } from 'vue'
import { ComponentDesign } from '../../classes/ComponentDesign'

import { IconIndeterminateType, IconSizeType } from '../../constructors/Icon/props.type'
import { Md2IconRoundedType } from './props.type'

export const defaultItem = ComponentDesign.getDefault('md2.icon')
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
  rounded: String as PropType<Md2IconRoundedType>,
  background: [Boolean, String],
  backgroundActive: Boolean,
  animationType: String as PropType<IconIndeterminateType>,
  animationShow: Boolean,
  inEnd: Boolean
}
