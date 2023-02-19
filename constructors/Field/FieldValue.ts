import { computed, Ref } from 'vue'
import { isFilled } from '../../functions'
import { NumberOrStringType } from '../types'

export class FieldValue {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly getClassName: (name: string[], status: NumberOrStringType[]) => string,
    private readonly value: Ref<string>
  ) {
  }

  readonly item = computed<boolean>(() => isFilled(this.value.value))

  is (): boolean {
    return this.item.value
  }

  getClass (): object {
    return { [this.getClassName([], ['value'])]: this.item }
  }
}
