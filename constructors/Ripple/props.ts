import { DefaultConfiguration } from '../../classes/DefaultConfiguration'

const defaultProps = DefaultConfiguration.init('ripple')

export const props = {
  // Status
  disabled: defaultProps('disabled', false)
}
