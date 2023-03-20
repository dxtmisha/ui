import { Ref, ref, watch } from 'vue'

export class MotionAxisPreparation {
  readonly item = ref<string>('')

  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly selected: Ref<string>
  ) {
    watch(this.selected, (element: string, preparation: string) => {
      this.item.value = preparation || ''
    })
  }

  get (): string {
    return this.item.value
  }
}
