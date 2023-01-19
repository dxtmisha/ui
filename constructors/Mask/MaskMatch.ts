import { Ref } from 'vue'

export class MaskMatch {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly match: Ref<RegExp>
  ) {
  }

  filter (text: string): string[] {
    return text
      .split('')
      .filter(char => this.isMatch(char))
  }

  isMatch (char: string): boolean {
    return !!char.match(this.match.value)
  }
}
