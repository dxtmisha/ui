import { PropType } from 'vue'
import { ComponentDesign } from '../../classes/ComponentDesign'
import {
  Md2WindowAdaptiveType,
  Md2WindowAxisType,
  Md2WindowIndentType,
  Md2WindowRoundedType,
  Md2WindowWidthType
} from './props.type'

export const defaultItem = ComponentDesign.getDefault('md2.window')
export const props = {
  // Values
  beforeOpening: Function,
  opening: Function,

  // Status
  disabled: Boolean,

  // Options
  adaptive: {
    type: String as PropType<Md2WindowAdaptiveType>,
    default: defaultItem.defaultValue('adaptive'),
    validator: defaultItem.validator('adaptive')
  },
  autoClose: {
    type: Boolean,
    default: true
  },
  axis: {
    type: String as PropType<Md2WindowAxisType>,
    default: defaultItem.defaultValue('axis'),
    validator: defaultItem.validator('axis')
  },
  indent: {
    type: [Number, String] as PropType<Md2WindowIndentType>,
    default: defaultItem.defaultValue('indent')
  },
  inDom: Boolean,
  persistent: Boolean,
  shape: {
    type: String as PropType<Md2WindowRoundedType>,
    default: defaultItem.defaultValue('shape'),
    validator: defaultItem.validator('shape')
  },
  width: {
    type: [Number, String] as PropType<Md2WindowWidthType>,
    default: defaultItem.defaultValue('width')
  }
}
