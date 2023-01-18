import { Ref } from 'vue'

export class MaskMatch {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly match: Ref<RegExp>
  ) {
  }

  isMatch (char: string): boolean {
    return !!char.match(this.match.value)
  }
}
