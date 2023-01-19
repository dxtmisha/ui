import { computed } from 'vue'
import { MaskPattern } from './MaskPattern'
import { MaskValue } from './MaskValue'
import { forEach } from '../../functions'
import { MaskItemType, MaskPatternType, MaskValidationType } from './types'

export class MaskValidation {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly pattern: MaskPattern,
    protected readonly values: MaskValue
  ) {
  }

  protected validation = computed<MaskValidationType | undefined>(() => {
    let validation: MaskValidationType | undefined

    forEach<MaskPatternType, string, void>(
      this.pattern.get(),
      (item, index) => {
        if (!validation && this.values.is(index)) {
          const value = this.values.getInfo(index)

          if (value && value.full) {
            const check = this.check(value)

            if (!check.status) {
              validation = check
            }
          }
        }
      }
    )

    return validation || this.validationCheck.value
  })

  protected check (item: MaskItemType): MaskValidationType {
    const pattern = this.pattern.getItem(item.index)
    const input = this.getInput(this.getInputAttributes(pattern))

    input.value = item.value

    return {
      index: item.index,
      input,
      status: input?.checkValidity(),
      validationMessage: input.validationMessage,
      validity: input.validity,
      pattern
    }
  }

  getValidation (): MaskValidationType | undefined {
    return this.validation.value
  }
}
