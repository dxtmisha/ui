import { PropType } from 'vue'
import { ComponentDesign } from '../../classes/ComponentDesign'
import {
  Md2ButtonHeightType,
  Md2ButtonRoundedType,
  Md2ButtonWidthType, Md2FieldAlignType, Md2FieldAppearanceType, Md2FieldCancelType
} from './props.type'
import { Md2PaletteType } from '../props.type'

export const defaultItem = ComponentDesign.getDefault('md2.button')
export const props = {
  // Values
  counter: Number,
  helperMessage: String,
  icon: [Object, String],
  iconTrailing: [Object, String],
  maxlength: Number,
  prefix: [Number, String],
  required: Boolean,
  suffix: [Number, String],
  text: [Number, String],
  validationMessage: String,

  // Status
  active: Boolean,
  disabled: Boolean,
  disabledPrevious: Boolean,
  disabledNext: Boolean,
  dragged: Boolean,
  focus: Boolean,
  progress: Boolean,
  readonly: Boolean,
  selected: Boolean,
  turn: Boolean,

  // Options
  align: {
    type: String as PropType<Md2FieldAlignType>,
    validator: defaultItem.validator('align')
  },
  appearance: {
    type: String as PropType<Md2FieldAppearanceType>,
    default: defaultItem.defaultValue('appearance'),
    validator: defaultItem.validator('appearance')
  },
  arrow: Boolean,
  cancel: {
    type: [Boolean, String] as PropType<Md2FieldCancelType>,
    default: defaultItem.defaultValue('cancel'),
    validator: defaultItem.validator('cancel')
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
