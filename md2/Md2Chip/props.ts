import { PropType } from 'vue'
import { _props as propsChip } from '../../constructors/Chip/_props'
import { Md2PaletteType } from '../props.type'

export const props = {
  ...propsChip,
  palette: String as PropType<Md2PaletteType>
}
