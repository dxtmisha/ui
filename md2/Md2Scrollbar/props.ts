import { ComponentDesign } from '../../classes/ComponentDesign'

export const defaultItem = ComponentDesign.getDefault('md2.scrollbar')
export const props = {
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
  }
}

export default {
  props
}
