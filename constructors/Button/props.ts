import { PropType } from 'vue'
import { DefaultConfiguration } from '../../classes/DefaultConfiguration'
import { AssociativeType, NumberOrStringType } from '../types'
import {
  ButtonAdaptiveType,
  ButtonAlignType,
  ButtonAppearanceType,
  ButtonRoundedType,
  ButtonSizeType
} from './propsType'

const defaultProps = DefaultConfiguration.init('button')

export const props = {
  // Values
  detail: [Object] as PropType<AssociativeType>,
  icon: undefined,
  iconTrailing: undefined,
  text: [Number, String] as PropType<NumberOrStringType>,
  to: String,
  value: [Number, String] as PropType<NumberOrStringType>,

  // Status
  active: Boolean,
  disabled: Boolean,
  dragged: Boolean,
  hide: Boolean,
  progress: Boolean,
  readonly: Boolean,
  selected: Boolean,
  turn: Boolean,

  // Options
  adaptive: {
    type: String as PropType<ButtonAdaptiveType>,
    default: defaultProps('adaptive', 'full')
  },
  align: {
    type: String as PropType<ButtonAlignType>,
    default: defaultProps('align')
  },
  appearance: {
    type: String as PropType<ButtonAppearanceType>,
    default: defaultProps('appearance', 'contained')
  },
  color: String,
  dense: Boolean,
  ellipsis: {
    type: Boolean,
    default: defaultProps('ellipsis', true)
  },
  lowercase: {
    type: Boolean,
    default: defaultProps('lowercase')
  },
  rounded: {
    type: String as PropType<ButtonRoundedType>,
    default: defaultProps('rounded', 'sm')
  },
  height: {
    type: String as PropType<ButtonSizeType>,
    default: defaultProps('height', 'md')
  },
  tag: {
    type: String,
    default: 'button'
  },
  ripple: {
    type: Boolean,
    default: defaultProps('ripple', true)
  }
}
