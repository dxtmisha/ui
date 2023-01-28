import { PropType } from 'vue'
import { ComponentDesign } from '../../classes/ComponentDesign'
import { InputMatchType, InputTypeType } from '../../constructors/Input/types'
import { Md2PaletteType } from '../props.type'
import {
  Md2FieldAlignType,
  Md2FieldAppearanceType,
  Md2FieldCancelType,
  Md2FieldHeightType,
  Md2FieldRoundedType,
  Md2FieldWidthType
} from '../Md2Field/props.type'

export const defaultItem = ComponentDesign.getDefault('md2.input')
export const props = {
  // Values
  detail: [Object],
  icon: [Object, String],
  iconTrailing: [Object, String],
  mask: [Object, String],
  name: String,
  prefix: [Number, String],
  required: Boolean,
  suffix: [Number, String],
  text: [Number, String],
  value: [Number, String],

  // Input
  autocomplete: {
    type: String,
    default: 'off'
  },
  autofocus: Boolean,
  inputmode: String,
  step: Number,
  min: [Number, String],
  max: [Number, String],
  minlength: Number,
  maxlength: Number,
  pattern: String,
  placeholder: String,
  spellcheck: Boolean,
  input: Object,
  inputMatch: [Object, String] as PropType<InputMatchType>,

  // Message
  counter: Boolean,
  helperMessage: String,
  validationCode: [Object],
  validationMessage: String,

  // On
  modelValue: undefined,
  on: {
    type: Object,
    default: {}
  },

  // Status
  disabled: Boolean,
  readonly: Boolean,
  selected: Boolean,

  // Options
  align: {
    type: String as PropType<Md2FieldAlignType>,
    validator: defaultItem.validator('align')
  },
  appearance: {
    type: String as PropType<Md2FieldAppearanceType>,
    default: defaultItem.defaultValue('appearance')
  },
  arrow: Boolean,
  cancel: {
    type: String as PropType<Md2FieldCancelType>,
    default: defaultItem.defaultValue('cancel', 'auto')
  },
  height: {
    type: [Number, String] as PropType<Md2FieldHeightType>,
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
  type: {
    type: String as PropType<InputTypeType>,
    default: 'text'
  },
  width: {
    type: [Number, String] as PropType<Md2FieldWidthType>,
    default: defaultItem.defaultValue('width')
  },
  field: {
    type: Object,
    default: defaultItem.defaultValue('field')
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
  },
  iconVisibility: {
    type: [Object, String],
    default: defaultItem.defaultValue('iconVisibility', 'visibility')
  },
  iconVisibilityOff: {
    type: [Object, String],
    default: defaultItem.defaultValue('iconVisibilityOff', 'visibility_off')
  }
}
