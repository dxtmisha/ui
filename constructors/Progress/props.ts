import { DefaultConfiguration } from '../../classes/DefaultConfiguration'
import { PropType } from 'vue'

const defaultProps = DefaultConfiguration.init('progress')

export type ProgressIndeterminateType = 'type1' | 'type2'
export type ProgressTypeType = 'linear' | 'circular'

export const props = {
  // Values
  max: {
    type: Number,
    default: 100
  },
  value: {
    type: Number,
    default: null
  },

  // Status
  visible: Boolean,

  // Options
  bottom: {
    type: Boolean,
    default: defaultProps('bottom')
  },
  delay: {
    type: Number,
    default: defaultProps('delay', 400)
  },
  dense: Boolean,
  indeterminate: {
    type: String as PropType<ProgressIndeterminateType>,
    default: defaultProps('indeterminate', 'type1'),
    validator: DefaultConfiguration.validator<string>([
      'type1',
      'type2'
    ])
  },
  inverse: Boolean,
  type: {
    type: String as PropType<ProgressTypeType>,
    default: 'linear',
    validator: DefaultConfiguration.validator<string>([
      'linear',
      'circular'
    ])
  }
}
