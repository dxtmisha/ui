import { computed, Ref } from 'vue'
import { InputValue } from './InputValue'
import { Translation } from '../../classes/Translation'
import { InputMatchType } from './types'

export class InputMatch {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly input: Ref<HTMLInputElement | undefined>,
    protected readonly match: Ref<InputMatchType>,
    protected readonly value: InputValue
  ) {
  }

  readonly name = computed<string>(
    () => typeof this.match.value === 'object' ? this.match.value?.name : (this.match.value || '')
  )

  readonly text = computed<string>(
    () => typeof this.match.value === 'object' ? this.match.value?.text : (Translation.get('Your entries must match.').value)
  )

  check (): string | undefined {
    const input = this.input.value?.form?.querySelector<HTMLInputElement>(`[name="${this.name.value}"]`) ||
      document.querySelector<HTMLInputElement>(this.name.value)

    if (
      input &&
      input.value !== this.value.get()
    ) {
      return this.text.value
    } else {
      return undefined
    }
  }
}
