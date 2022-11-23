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
    default: defaultProps('adaptive', 'full'),
    validator: DefaultConfiguration.validator([
      'auto',
      'xs',
      'sm',
      'md',
      'lg',
      'xl',
      'full',
      'icon'
    ])
  },
  align: {
    type: String as PropType<ButtonAlignType>,
    default: defaultProps('align'),
    validator: DefaultConfiguration.validator([
      'center',
      'left',
      'right'
    ])
  },
  appearance: {
    type: String as PropType<ButtonAppearanceType>,
    default: defaultProps('appearance', 'contained'),
    validator: DefaultConfiguration.validator([
      'text',
      'text-color',
      'outlined',
      'outlined-color',
      'outlined-contained',
      'contained',
      'fab',
      'chip',
      'chip-color',
      'chip-outlined'
    ])
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
    default: defaultProps('rounded', 'sm'),
    validator: DefaultConfiguration.validator([
      'none',
      'standard',
      'sm',
      'md',
      'lg',
      'xl',
      'full'
    ])
  },
  size: {
    type: String as PropType<ButtonSizeType>,
    default: defaultProps('size', 'md'),
    validator: DefaultConfiguration.validator([
      'sm',
      'md',
      'lg'
    ])
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
