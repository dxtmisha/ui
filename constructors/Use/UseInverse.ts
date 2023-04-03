import { computed, Ref } from 'vue'
import { isSelectedByList } from '../../functions/data'

import { BooleanOrNumberOrStringType } from '../types'

export class UseInverse {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly appearanceInverse: BooleanOrNumberOrStringType[],
    protected readonly appearance?: Ref<BooleanOrNumberOrStringType>
  ) {
  }

  readonly item = computed<boolean>(() => isSelectedByList([this.appearance?.value, 'all'], this.appearanceInverse))

  get (): boolean {
    return this.item.value
  }
}
