import { PropType } from 'vue'
import { DefaultConfiguration } from '../../classes/DefaultConfiguration'

export type IconIndeterminateType = 'type1' | 'type2'
export type IconSizeType = 'dn' | 'xs' | 'sm' | 'md' | 'lr' | 'xl' | 'hd'

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
    validator: DefaultConfiguration.validatorOrNumber([
      'dn',
      'xs',
      'sm',
      'md',
      'lr',
      'xl',
      'hd'
    ])
  }
}
