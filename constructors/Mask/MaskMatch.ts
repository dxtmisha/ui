import { Ref } from 'vue'
import { AssociativeType } from '../types'

export class MaskMatch {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly match: Ref<AssociativeType<RegExp> | RegExp>
  ) {
  }

  filter (text: string): string[] {
    return text
      .split('')
      .filter(char => this.isMatch(char))
  }

  isMatch (char: string, index?: string): boolean {
    const match = this.match.value

    if (match instanceof RegExp) {
      return !!char.match(match)
    } else if (index && index in match) {
      return !!char.match(match[index])
    } else {
      return !!char.match(/[0-9]/)
    }
  }
}
