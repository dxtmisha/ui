import {PropType} from 'vue'
import {DefaultConfiguration} from "../../classes/DefaultConfiguration";

const defaultProps = DefaultConfiguration.init('image')
export const props = {
  // Values
  value: [File, String],
  coordinator: Array as PropType<number[]>,
  size: [String, Number],
  x: [String, Number],
  y: [String, Number],

  // Status
  disabled: Boolean,
  hide: Boolean,

  // Options
  adaptive: Boolean,
  url: {
    type: String,
    default: defaultProps('url', '/icons/')
  }
}
