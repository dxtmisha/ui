import { computed, ref, Ref } from 'vue'
import { AssociativeType } from '../types'
import { InputTypeType } from './types'

export class InputType {
  protected readonly visibility = ref(false)

  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly typeIn: Ref<InputTypeType>,
    protected readonly iconVisibility?: Ref<string>,
    protected readonly iconVisibilityOff?: Ref<string>
  ) {
  }

  protected readonly icon = computed<AssociativeType>(() => {
    return {
      active: this.visibility.value,
      icon: this.iconVisibilityOff?.value,
      iconActive: this.iconVisibility?.value
    }
  })

  protected readonly type = computed<string>(
    () => this.typeIn.value === 'password' && this.visibility.value ? 'text' : this.typeIn.value || 'text'
  )

  get () {
    return this.type.value
  }

  getIcon (): AssociativeType {
    return this.icon.value
  }

  toggleVisibility (): this {
    if (this.typeIn.value === 'password') {
      this.visibility.value = !this.visibility.value
    }

    return this
  }
}
