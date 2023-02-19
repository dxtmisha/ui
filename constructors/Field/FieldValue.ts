import { computed, Ref } from 'vue'
import { ComponentItem } from '../../classes/ComponentItem'
import { isFilled } from '../../functions'

export class FieldValue {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly component: ComponentItem,
    private readonly value: Ref<string>
  ) {
  }

  readonly item = computed<boolean>(() => isFilled(this.value.value))

  is (): boolean {
    return this.item.value
  }

  getClass (): object {
    return { [this.component?.getClassName([], ['value'])]: this.item }
  }
}
