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
  description: String,
  detail: [Object],
  icon: [Object, String],
  iconTrailing: [Object, String],
  prefix: [Number, String],
  suffix: [Number, String],
  text: [Number, String],
  textHighlight: [Number, String],
  textShort: [Number, String],
  thumbnail: [Object, String],
  to: String,
  value: [Number, Object, String],

  // Status
  disabled: Boolean,
  highlight: Boolean,
  progress: Boolean,
  readonly: Boolean,
  selected: Boolean,
  turn: Boolean,

  // Options
  adaptive: {
    type: String as PropType<Md2ListItemAdaptiveType>,
    default: defaultItem.defaultValue('adaptive'),
    validator: defaultItem.validator('adaptive')
  },
  appearance: {
    type: String as PropType<Md2ListItemAppearanceType>,
    default: defaultItem.defaultValue('appearance'),
    validator: defaultItem.validator('appearance')
  },
  overlay: [Boolean, String] as PropType<boolean | Md2PaletteType>,
  border: Boolean,
  dense: Boolean,
  height: {
    type: [Number, String] as PropType<Md2ListItemHeightType>,
    default: defaultItem.defaultValue('height')
  },
  palette: String as PropType<Md2PaletteType>,
  rounded: {
    type: String as PropType<Md2ListItemRoundedType>,
    default: defaultItem.defaultValue('rounded'),
    validator: defaultItem.validator('rounded')
  },
  tag: {
    type: String,
    default: 'span'
  },
  ripple: {
    type: Boolean,
    default: defaultItem.defaultValue('ripple', true)
  }
}
