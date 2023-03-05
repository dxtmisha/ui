import { PropType } from 'vue'
import { ComponentDesign } from '../../classes/ComponentDesign'
import { WindowAnimationOriginType, WindowAlignmentType } from '../../constructors/Window/props.type'
import {
  Md2WindowAdaptiveType,
  Md2WindowAxisType,
  Md2WindowRoundedType,
  Md2WindowWidthType
} from './props.type'

export const defaultItem = ComponentDesign.getDefault('md2.window')
export const props = {
  // Values
  beforeOpening: Function,
  preparation: Function,
  opening: Function,
  persistent: Boolean,
  inDom: Boolean,
  flash: Boolean,

  // Status
  disabled: Boolean,

  // Options
  adaptive: {
    type: String as PropType<Md2WindowAdaptiveType>,
    default: defaultItem.defaultValue('adaptive'),
    validator: defaultItem.validator('adaptive')
  },
  rounded: {
    type: String as PropType<Md2WindowRoundedType>,
    default: defaultItem.defaultValue('rounded')
  },
  autoClose: {
    type: Boolean,
    default: true
  },
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
  fullscreen: Boolean,

  contextmenu: Boolean,
  axis: {
    type: String as PropType<Md2WindowAxisType>,
    default: 'y'
  },
  indent: {
    type: Number,
    default: defaultItem.defaultValue('indent', 4)
  },
  width: {
    type: [Number, String] as PropType<Md2WindowWidthType>,
    default: defaultItem.defaultValue('width')
  },
  height: {
    type: [Number, String] as PropType<Md2WindowWidthType>,
    default: defaultItem.defaultValue('height')
  }
}
