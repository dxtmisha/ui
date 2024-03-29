import { PropType } from 'vue'
import { ElementType } from '../types'

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
  inverse: Boolean,
  scroll: Object
}

export default {
  props
}
