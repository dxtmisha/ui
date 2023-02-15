import { computed, Ref } from 'vue'
import { isFilled } from '../../functions'

export class FieldValue {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly value: Ref<string>
  ) {
  }

  readonly item = computed<boolean>(() => isFilled(this.value.value))

  is (): boolean {
    return this.item.value
  }
}
