import { ref, Ref, watchEffect } from 'vue'

export class MotionScrollPage {
  readonly item = ref<string | undefined>()

  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly page: Ref<string | undefined>
  ) {
    watchEffect(() => {
      this.item.value = this.page.value
    })
  }

  get (): string | undefined {
    return this.item.value
  }

  set (page: string | undefined): this {
    this.item.value = page
    return this
  }
}
