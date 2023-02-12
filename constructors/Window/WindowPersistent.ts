import { Ref, ref } from 'vue'

export class WindowPersistent {
  private readonly item = ref<boolean>(false)

  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly persistent: Ref<boolean>
  ) {
  }

  getClass (): object {
    return { 'is-persistent': this.item }
  }

  on (): boolean {
    if (this.persistent.value) {
      this.item.value = true
      return true
    } else {
      return false
    }
  }

  disabled (): this {
    if (this.item.value) {
      this.item.value = false
    }

    return this
  }
}
