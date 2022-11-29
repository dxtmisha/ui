import { PropType } from 'vue'
import { _props as propsChip } from '../../constructors/Chip/_props'
import { Md2PaletteType } from '../md2PropsType'

export const props = {
  ...propsChip,
  palette: String as PropType<Md2PaletteType>
}
