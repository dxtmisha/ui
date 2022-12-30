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
  counter: Number,
  detail: [Object],
  helperMessage: String,
  icon: [Object, String],
  iconTrailing: [Object, String],
  maxlength: Number,
  prefix: [Number, String],
  required: Boolean,
  suffix: [Number, String],
  text: [Number, String],
  validationMessage: String,
  value: undefined,

  // Status
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
    type: String as PropType<Md2FieldCancelType>,
    default: defaultItem.defaultValue('cancel'),
    validator: defaultItem.validator('cancel')
  },
  height: {
    type: String as PropType<Md2FieldHeightType>,
    default: defaultItem.defaultValue('height')
  },
  palette: String as PropType<Md2PaletteType>,
  ripple: {
    type: Boolean,
    default: defaultItem.defaultValue('ripple', true)
  },
  rounded: {
    type: String as PropType<Md2FieldRoundedType>,
    default: defaultItem.defaultValue('rounded'),
    validator: defaultItem.validator('rounded')
  },
  width: {
    type: [Number, String] as PropType<Md2FieldWidthType>,
    default: defaultItem.defaultValue('width')
  },

  // Icon
  iconPrevious: {
    type: [Object, String],
    default: defaultItem.defaultValue('iconPrevious', {
      icon: 'chevron_left',
      size: 'sm'
    })
  },
  iconNext: {
    type: [Object, String],
    default: defaultItem.defaultValue('iconNext', {
      icon: 'chevron_right',
      size: 'sm'
    })
  },
  iconCancel: {
    type: [Object, String],
    default: defaultItem.defaultValue('iconCancel', 'cancel')
  }
}
