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
  text: [Number, String],
  icon: [Object, String],
  iconTrailing: [Object, String],
  to: String,
  value: [Number, Object, String],
  detail: [Object],

  // Status
  turn: Boolean,
  hide: Boolean,
  selected: Boolean,
  readonly: Boolean,
  progress: Boolean,
  disabled: Boolean,
  dragged: Boolean,

  // Options
  tag: {
    type: String,
    default: 'button'
  },
  palette: String as PropType<Md2PaletteType>,
  appearance: {
    type: String as PropType<Md2ButtonAppearanceType>,
    default: defaultItem.defaultValue('appearance'),
    validator: defaultItem.validator('appearance')
  },
  align: {
    type: String as PropType<Md2ButtonAlignType>,
    validator: defaultItem.validator('align')
  },
  adaptive: {
    type: String as PropType<Md2ButtonAdaptiveType>,
    default: defaultItem.defaultValue('adaptive'),
    validator: defaultItem.validator('adaptive')
  },
  rounded: {
    type: String as PropType<Md2ButtonRoundedType>,
    default: defaultItem.defaultValue('rounded'),
    validator: defaultItem.validator('rounded')
  },
  width: {
    type: String as PropType<Md2ButtonWidthType>,
    default: defaultItem.defaultValue('width')
  },
  height: {
    type: String as PropType<Md2ButtonHeightType>,
    default: defaultItem.defaultValue('height')
  },
  dense: Boolean,
  lowercase: {
    type: Boolean,
    default: defaultItem.defaultValue('lowercase')
  },
  ellipsis: {
    type: Boolean,
    default: defaultItem.defaultValue('ellipsis')
  },
  ripple: {
    type: Boolean,
    default: defaultItem.defaultValue('ripple', true)
  }
}
