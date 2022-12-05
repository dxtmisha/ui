import { PropType } from 'vue'
import { ComponentDesign } from '../../classes/ComponentDesign'
import {
  Md2ChipAdaptiveType,
  Md2ChipAlignType,
  Md2ChipAppearanceType,
  Md2ChipHeightType,
  Md2ChipRoundedType,
  Md2ChipWidthType
} from './props.type'
import { Md2PaletteType } from '../props.type'

export const defaultItem = ComponentDesign.getDefault('md2.chip')
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
  readonly: Boolean,
  selected: Boolean,
  turn: Boolean,

  // Options
  adaptive: {
    type: String as PropType<Md2ChipAdaptiveType>,
    default: defaultItem.defaultValue('adaptive'),
    validator: defaultItem.validator('adaptive')
  },
  align: {
    type: String as PropType<Md2ChipAlignType>,
    validator: defaultItem.validator('align')
  },
  appearance: {
    type: String as PropType<Md2ChipAppearanceType>,
    default: defaultItem.defaultValue('appearance'),
    validator: defaultItem.validator('appearance')
  },
  dense: Boolean,
  ellipsis: {
    type: Boolean,
    default: defaultItem.defaultValue('ellipsis')
  },
  height: {
    type: [Number, String] as PropType<Md2ChipHeightType>,
    default: defaultItem.defaultValue('height')
  },
  lowercase: {
    type: Boolean,
    default: defaultItem.defaultValue('lowercase')
  },
  palette: String as PropType<Md2PaletteType>,
  rounded: {
    type: String as PropType<Md2ChipRoundedType>,
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
    type: [Number, String] as PropType<Md2ChipWidthType>,
    default: defaultItem.defaultValue('width')
  }
}
