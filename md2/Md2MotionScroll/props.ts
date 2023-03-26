import { ComponentDesign } from '../../classes/ComponentDesign'
import { PropType } from 'vue'
import { ElementType } from '../../constructors/types'

export const defaultItem = ComponentDesign.getDefault('md2.motion-scroll')
export const props = {
  // Values
  elementScroll: [Element, String] as PropType<ElementType | string>,
  page: String,

  // Options
  tag: {
    type: String,
    default: 'div'
  },
  visible: Boolean,
  border: Boolean,
  inverse: {
    type: Boolean,
    default: defaultItem.defaultValue('inverse', false)
  },
  scroll: Object
}

export default {
  props
}
