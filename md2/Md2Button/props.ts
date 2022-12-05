import { PropType } from 'vue'
import { ComponentDesign } from '../../classes/ComponentDesign'
import {
  Md2ButtonAdaptiveType,
  Md2ButtonAlignType,
  Md2ButtonAppearanceType,
  Md2ButtonHeightType,
  Md2ButtonRoundedType,
  Md2ButtonWidthType
} from './props.type'
import { Md2PaletteType } from '../props.type'

export const defaultItem = ComponentDesign.getDefault('md2.button')
export const props = {
  // Values
  detail: [Object],
  icon: [Object, String],
  iconTrailing: [Object, String],
  text: [Number, String],
  to: String,
  value: [Number, Object, String],

  // Status
  disabled: Boolean,
  dragged: Boolean,
  progress: Boolean,
  selected: Boolean,
  turn: Boolean,

  // Options
  adaptive: {
    type: String as PropType<Md2ButtonAdaptiveType>,
    default: defaultItem.defaultValue('adaptive'),
    validator: defaultItem.validator('adaptive')
  },
  align: {
    type: String as PropType<Md2ButtonAlignType>,
    validator: defaultItem.validator('align')
  },
  appearance: {
    type: String as PropType<Md2ButtonAppearanceType>,
    default: defaultItem.defaultValue('appearance'),
    validator: defaultItem.validator('appearance')
  },
  dense: Boolean,
  ellipsis: {
    type: Boolean,
    default: defaultItem.defaultValue('ellipsis')
  },
  height: {
    type: [Number, String] as PropType<Md2ButtonHeightType>,
    default: defaultItem.defaultValue('height')
  },
  lowercase: {
    type: Boolean,
    default: defaultItem.defaultValue('lowercase')
  },
  palette: String as PropType<Md2PaletteType>,
  rounded: {
    type: String as PropType<Md2ButtonRoundedType>,
    default: defaultItem.defaultValue('rounded'),
    validator: defaultItem.validator('rounded')
  },
  tag: {
    type: String,
    default: 'button'
  },
  ripple: {
    type: Boolean,
    default: defaultItem.defaultValue('ripple', true)
  },
  width: {
    type: [Number, String] as PropType<Md2ButtonWidthType>,
    default: defaultItem.defaultValue('width')
  }
}
