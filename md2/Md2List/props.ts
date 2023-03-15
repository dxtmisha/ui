import { PropType } from 'vue'
import { ComponentDesign } from '../../classes/ComponentDesign'
import {
  Md2ListItemAdaptiveType,
  Md2ListItemAppearanceType,
  Md2ListItemHeightType,
  Md2ListItemRoundedType
} from '../Md2ListItem/props.type'
import { Md2PaletteType } from '../props.type'

export const defaultItem = ComponentDesign.getDefault('md2.list')
export const props = {
  // Values
  icon: [Object, String],
  list: [Array, Object],
  rename: Object,
  value: undefined,

  filter: String,
  filterIndex: [Array, String],

  sort: String,
  desc: Boolean,

  checkbox: Boolean,
  checkboxRight: Boolean,

  // Status
  readonly: Boolean,
  disabled: Boolean,

  // Options
  tag: {
    type: String,
    default: 'span'
  },
  palette: String as PropType<Md2PaletteType>,
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
