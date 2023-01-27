import { computed, Ref } from 'vue'
import { MaskDate } from './MaskDate'
import { MaskSpecial } from './MaskSpecial'
import { MaskType } from './MaskType'
import { MaskPatternType, MaskPatternTypeType } from './types'

export class MaskPattern {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly type: MaskType,
    protected readonly date: MaskDate,
    protected readonly special: MaskSpecial,
    protected readonly pattern: Ref<MaskPatternType>
  ) {
  }

  protected readonly item = computed<MaskPatternType>(() => {
    if (this.type.isDate()) {
      return {
        ...this.date.getPattern(),
        ...this.pattern.value
      }
    } else if (
      this.special.isString() &&
      this.isOnly()
    ) {
      return { [this.special.getOnly()]: this.pattern.value as MaskPatternTypeType }
    } else {
      return this.pattern.value || {}
    }
  })

  get (): MaskPatternType {
    return this.item.value
  }

  getItem (index: string): MaskPatternTypeType {
    return this.get()?.[index] || ''
  }

  is (index: string) {
    return index in this.get()
  }

  isCheck () {
    return this.is('check')
  }

  protected isOnly (): boolean {
    return ['function', 'string'].indexOf(typeof this.pattern.value) !== -1
  }
}
