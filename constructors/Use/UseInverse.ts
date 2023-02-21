import { computed, Ref } from 'vue'
import { isSelectedByList } from '../../functions'

export class UseInverse {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly appearanceInverse: string[],
    private readonly appearance: Ref<boolean>
  ) {
  }

  readonly item = computed<boolean>(() => isSelectedByList([this.appearance.value, 'all'], this.appearanceInverse))

  get (): boolean {
    return this.item.value
  }
}
