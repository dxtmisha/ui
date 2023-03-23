import { ref, Ref, watch } from 'vue'

export class MotionAxisToSelected {
  readonly item = ref<string>('')

  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly selected: Ref<string>
  ) {
    watch(this.selected, () => this.set(this.selected.value), { immediate: true })
  }

  is (value: string): boolean {
    return this.item.value === value
  }

  get (): string {
    return this.item.value
  }

  set (value: string): this {
    this.item.value = value
    return this
  }
}
