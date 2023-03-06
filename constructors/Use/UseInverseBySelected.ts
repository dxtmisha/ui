import { UseInverse } from './UseInverse'
import { BooleanOrNumberOrStringType } from '../types'
import { computed, Ref } from 'vue'
import { isSelectedByList } from '../../functions'

export class UseInverseBySelected extends UseInverse {
  constructor (
    protected readonly appearanceInverse: BooleanOrNumberOrStringType[],
    protected readonly appearance?: Ref<BooleanOrNumberOrStringType>,
    protected readonly selectedInverse?: BooleanOrNumberOrStringType[],
    protected readonly selected?: Ref<boolean>
  ) {
    super(appearanceInverse, appearance)
  }

  readonly itemBySelected = computed<boolean>(() => this.isSelected.value || this.item.value)

  readonly isSelected = computed<boolean>(
    () => !!this.selected?.value && isSelectedByList([this.appearance?.value, 'all'], this.selectedInverse)
  )

  get (): boolean {
    return this.itemBySelected.value
  }
}
