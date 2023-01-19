import { computed } from 'vue'
import { MaskPattern } from './MaskPattern'
import { MaskValue } from './MaskValue'
import { forEach, isFilled } from '../../functions'
import { MaskItemsType, MaskItemType, MaskPatternType, MaskPatternTypeType, MaskValidationType } from './types'
import { AssociativeType } from '../types'

export class MaskValidation {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly pattern: MaskPattern,
    protected readonly value: MaskValue
  ) {
  }

  protected readonly validation = computed<MaskValidationType | undefined>(() => {
    let validation: MaskValidationType | undefined

    forEach<MaskPatternType, string, void>(
      this.pattern.get(),
      (item, index) => {
        if (!validation && this.value.is(index)) {
          const value = this.value.getInfo(index)

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

  protected readonly validationCheck = computed<MaskValidationType | undefined>(() => {
    let validation: MaskValidationType | undefined

    if (
      this.value.isFull() &&
      this.pattern.isCheck()
    ) {
      const check = this.check(this.value.getForCheck())

      if (!check.status) {
        validation = check
      }
    }

    return validation
  })

  protected check (item: MaskItemType): MaskValidationType {
    const pattern = this.pattern.getItem(item.index)
    const input = this.getInput(this.getAttributes(pattern))

    input.value = item.value

    return {
      index: item.index,
      input,
      status: input.checkValidity(),
      validationMessage: input.validationMessage,
      validity: input.validity,
      pattern
    }
  }

  protected getInput (attributes: AssociativeType<string>): HTMLInputElement {
    const input = document.createElement('input')

    forEach<string, string, void>(attributes, (item, name) => {
      input.setAttribute(name, item)
    })

    return input
  }

  protected getAttributes (pattern: MaskPatternTypeType): AssociativeType<string> {
    const attributes = {} as AssociativeType<string>

    if (isFilled(pattern)) {
      switch (typeof pattern) {
        case 'function':
          Object.assign(attributes, this.executeFunction(pattern))
          break
        case 'string':
          attributes.pattern = pattern
          break
        case 'object':
          Object.assign(attributes, pattern)
          break
      }
    }

    return attributes
  }

  get (): MaskValidationType | undefined {
    return this.validation.value
  }

  protected executeFunction (
    callback: (value: MaskItemsType) => string | AssociativeType<string>
  ): AssociativeType<string> {
    const read = callback(this.value.get())

    if (typeof read === 'string') {
      return { pattern: read }
    } else {
      return read
    }
  }
}
