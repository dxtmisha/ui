import { Ref } from 'vue'

export class FieldArrow {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly arrow: Ref<boolean>,
    private readonly align: Ref<string>
  ) {
  }

  is (): boolean {
    return this.arrow.value
  }

  isLeft (): boolean {
    return this.is() && this.align.value === 'left'
  }

  isRight (): boolean {
    return this.is() && this.align.value === 'right'
  }

  getClass (): object {
    return { 'is-arrow': this.is() }
  }
}
