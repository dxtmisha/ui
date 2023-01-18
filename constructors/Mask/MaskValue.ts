import { MaskItemsType } from './types'
import { computed } from 'vue'
import { isSelected } from '../../functions'

export class MaskValue {
  protected readonly item: MaskItemsType

  protected valueByType = computed<MaskItemsType>(() => {
    const data = {} as MaskItemsType
    const special = this.deleteSpecial.value
    const standard = this.standard.value

    this.mask.value.forEach((char, index) => {
      if (isSelected(char, special)) {
        const value = this.addValueByType(data, char)

        if (standard[index] !== undefined) {
          value.chars.push(standard[index])
        }

        value.maxLength++
        value.full = value.maxLength === value.chars.length
        value.value = value.full ? value.chars.join('') : ''
      }
    })

    return data
  })
}
