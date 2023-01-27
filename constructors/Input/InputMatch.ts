import { computed, Ref } from 'vue'
import { InputValue } from './InputValue'
import { Translation } from '../../classes/Translation'
import { InputMatchType, InputValidationType } from './types'

export class InputMatch {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly input: Ref<HTMLInputElement | undefined>,
    protected readonly match: Ref<InputMatchType>,
    protected readonly value: InputValue
  ) {
    console.log('match', typeof this.match.value === 'object' ? this.match.value?.name : (this.match.value || ''))
  }

  readonly name = computed<string>(
    () => typeof this.match.value === 'object' ? this.match.value?.name : (this.match.value || '')
  )

  readonly text = computed<string>(
    () => typeof this.match.value === 'object' ? this.match.value?.text : (Translation.get('Your entries must match.').value)
  )

  check (): InputValidationType | undefined {
    console.log('this.name.value', this.name.value, this.text.value)
    if (this.name.value) {
      const input = this.input.value?.form?.querySelector<HTMLInputElement>(`[name="${this.name.value}"]`) ||
        document.querySelector<HTMLInputElement>(this.name.value)

      if (
        input &&
        input.value.trim() &&
        input.value !== this.value.get()
      ) {
        return {
          input,
          status: true,
          validationMessage: this.text.value,
          validity: input.validity
        }
      }
    }

    return undefined
  }
}
