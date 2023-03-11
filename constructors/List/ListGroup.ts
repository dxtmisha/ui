import { ref } from 'vue'

export class ListGroup {
  readonly item = ref(false)

  get (): boolean {
    return this.item.value
  }

  set (value: boolean): this {
    this.item.value = value
    return this
  }

  toggle (): this {
    this.item.value = !this.item.value
    return this
  }
}
