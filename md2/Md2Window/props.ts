import { PropType } from 'vue'
import { ComponentDesign } from '../../classes/ComponentDesign'
import { WindowAnimationOriginType, WindowAlignmentType } from '../../constructors/Window/props.type'
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
  contextmenu: Boolean,

  // Status
  disabled: Boolean,

  // Options
  alignment: {
    type: String as PropType<WindowAlignmentType>,
    default: defaultItem.defaultValue('alignment'),
    validator: defaultItem.validator('alignment')
  },
  animationOrigin: {
    type: String as PropType<WindowAnimationOriginType>,
    default: defaultItem.defaultValue('animationOrigin'),
    validator: defaultItem.validator('animationOrigin')
  },
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
    default: 'y'
  },
  height: {
    type: [Number, String] as PropType<Md2WindowWidthType>,
    default: defaultItem.defaultValue('height')
  },
  indent: {
    type: [Number, String] as PropType<Md2WindowIndentType>,
    default: defaultItem.defaultValue('indent', 4)
  },
  inDom: Boolean,
  rounded: {
    type: String as PropType<Md2WindowRoundedType>,
    default: defaultItem.defaultValue('rounded')
  },
  persistent: Boolean,
  width: {
    type: [Number, String] as PropType<Md2WindowWidthType>,
    default: defaultItem.defaultValue('width')
  }
}
