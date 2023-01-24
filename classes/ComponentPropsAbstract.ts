import { computed } from 'vue'
import { AssociativeType } from '../constructors/types'
import { isSelected } from '../functions'

export abstract class ComponentPropsAbstract {
  protected abstract readonly name: string
  protected abstract readonly list: AssociativeType
  protected abstract readonly exception: string[]

  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly props: AssociativeType & object,
    protected readonly extra = {} as AssociativeType & object
  ) {
  }

  readonly data = computed<AssociativeType & object>(() => {
    const data = {} as AssociativeType

    Object.keys(this.list).forEach(name => {
      if (
        name !== this.name &&
        name in this.props &&
        !isSelected(name, this.exception)
      ) {
        data[name] = this.props[name]
      }
    })

    return data
  })

  readonly main = computed<AssociativeType & object>(() => {
    return this.name in this.props ? this.props[this.name] : {}
  })

  readonly out = computed<AssociativeType & object>(() => {
    return {
      ...this.data.value,
      ...this.extra,
      ...this.main.value
    }
  })

  get () {
    return this.out
  }
}