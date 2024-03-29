import { PropType } from 'vue'
import { ComponentDesign } from '../../classes/ComponentDesign'
import {
  Md2ListItemAdaptiveType,
  Md2ListItemAppearanceType,
  Md2ListItemHeightType,
  Md2ListItemRoundedType
} from './props.type'
import { Md2PaletteType } from '../props.type'

export const defaultItem = ComponentDesign.getDefault('md2.list-item')
export const props = {
  // Values
  text: [Number, String],
  textShort: [Number, String],
  textHighlight: [Number, String],
  icon: [Object, String],
  iconTrailing: [Object, String],
  thumbnail: [Object, String],
  prefix: [Number, String],
  suffix: [Number, String],
  description: String,
  value: [Number, Object, String],
  detail: [Object],
  to: String,

  checkbox: Boolean,
  checkboxRight: Boolean,

  // Status
  turn: Boolean,
  focus: Boolean,
  highlight: Boolean,
  selected: Boolean,
  readonly: Boolean,
  progress: Boolean,
  disabled: Boolean,

  // Options
  tag: {
    type: String,
    default: 'span'
  },
  palette: String as PropType<Md2PaletteType>,
  overlay: [Boolean, String] as PropType<boolean | Md2PaletteType>,
  appearance: {
    type: String as PropType<Md2ListItemAppearanceType>,
    default: defaultItem.defaultValue('appearance'),
    validator: defaultItem.validator('appearance')
  },
  adaptive: {
    type: String as PropType<Md2ListItemAdaptiveType>,
    default: defaultItem.defaultValue('adaptive'),
    validator: defaultItem.validator('adaptive')
  },
  rounded: {
    type: String as PropType<Md2ListItemRoundedType>,
    default: defaultItem.defaultValue('rounded'),
    validator: defaultItem.validator('rounded')
  },
  height: {
    type: [Number, String] as PropType<Md2ListItemHeightType>,
    default: defaultItem.defaultValue('height')
  },
  border: Boolean,
  dense: Boolean,
  ripple: {
    type: Boolean,
    default: defaultItem.defaultValue('ripple', true)
  }
}
