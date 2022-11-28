import { PropType } from 'vue'
import { DefaultConfiguration } from '../../classes/DefaultConfiguration'
import { AssociativeType, NumberOrStringType } from '../types'
import {
  ButtonAdaptiveType,
  ButtonAlignType,
  ButtonAppearanceType,
  ButtonRoundedType,
  ButtonSizeType,
  ButtonWidthType
} from './props.type'

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
  disabled: Boolean,
  dragged: Boolean,
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
  dense: Boolean,
  ellipsis: {
    type: Boolean,
    default: defaultProps('ellipsis', true)
  },
  height: {
    type: String as PropType<ButtonSizeType>,
    default: defaultProps('height', 'md')
  },
  lowercase: {
    type: Boolean,
    default: defaultProps('lowercase')
  },
  palette: String,
  rounded: {
    type: String as PropType<ButtonRoundedType>,
    default: defaultProps('rounded', 'sm')
  },
  tag: {
    type: String,
    default: 'button'
  },
  ripple: {
    type: Boolean,
    default: defaultProps('ripple', true)
  },
  width: {
    type: [Number, String] as PropType<ButtonWidthType>,
    default: defaultProps('width', 'auto')
  }
}
