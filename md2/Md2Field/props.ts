import { PropType } from 'vue'
import { ComponentDesign } from '../../classes/ComponentDesign'
import {
  Md2FieldAlignType,
  Md2FieldAppearanceType,
  Md2FieldCancelType,
  Md2FieldHeightType,
  Md2FieldRoundedType,
  Md2FieldWidthType
} from './props.type'
import { Md2PaletteType } from '../props.type'

export const defaultItem = ComponentDesign.getDefault('md2.field')
export const props = {
  // Values
  text: [Number, String],
  icon: [Object, String],
  iconTrailing: [Object, String],
  prefix: [Number, String],
  suffix: [Number, String],
  value: undefined,
  detail: [Object],

  // Message
  counter: Number,
  maxlength: Number,
  helperMessage: String,
  validationMessage: String,

  // Status
  turn: Boolean,
  focus: Boolean,
  selected: Boolean,
  readonly: Boolean,
  disabled: Boolean,
  disabledPrevious: Boolean,
  disabledNext: Boolean,

  // Options
  palette: String as PropType<Md2PaletteType>,
  appearance: {
    type: String as PropType<Md2FieldAppearanceType>,
    default: defaultItem.defaultValue('appearance'),
    validator: defaultItem.validator('appearance')
  },
  arrow: Boolean,
  align: {
    type: String as PropType<Md2FieldAlignType>,
    validator: defaultItem.validator('align')
  },
  rounded: {
    type: String as PropType<Md2FieldRoundedType>,
    default: defaultItem.defaultValue('rounded'),
    validator: defaultItem.validator('rounded')
  },
  height: {
    type: String as PropType<Md2FieldHeightType>,
    default: defaultItem.defaultValue('height')
  },
  width: {
    type: [Number, String] as PropType<Md2FieldWidthType>,
    default: defaultItem.defaultValue('width')
  },
  required: Boolean,
  cancel: {
    type: String as PropType<Md2FieldCancelType>,
    default: defaultItem.defaultValue('cancel'),
    validator: defaultItem.validator('cancel')
  },
  ripple: {
    type: Boolean,
    default: defaultItem.defaultValue('ripple', true)
  },

  // Icon
  iconCancel: {
    type: [Object, String],
    default: defaultItem.defaultValue('iconCancel', 'cancel')
  },
  iconNext: {
    type: [Object, String],
    default: defaultItem.defaultValue('iconNext', {
      icon: 'chevron_right',
      size: 'sm'
    })
  },
  iconPrevious: {
    type: [Object, String],
    default: defaultItem.defaultValue('iconPrevious', {
      icon: 'chevron_left',
      size: 'sm'
    })
  }
}
