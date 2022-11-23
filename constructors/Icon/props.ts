import { PropType } from 'vue'
import { DefaultConfiguration } from '../../classes/DefaultConfiguration'
import { ImagePropsType } from '../Image/propsType'

export type IconIndeterminateType = 'type1' | 'type2'
export type IconSizeType = 'sm' | 'md' | 'lg' | 'xl'

export const props = {
  // Values
  icon: [String, Object] as PropType<string | ImagePropsType>,
  iconActive: [String, Object] as PropType<string | ImagePropsType>,

  // Status
  active: Boolean,
  disabled: Boolean,
  hide: Boolean,
  turn: Boolean,

  // Options
  animationShow: Boolean,
  animationType: {
    type: String as PropType<IconIndeterminateType>,
    validator: DefaultConfiguration.validator([
      'type1',
      'type2'
    ])
  },
  background: Boolean,
  size: {
    type: [Number, String] as PropType<IconSizeType>,
    default: 'sm'
  }
}
