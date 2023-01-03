import { computed, ComputedRef, isRef, Ref } from 'vue'
import { isFilled } from '../functions'
import { CallbackNullType, RefOrCallbackType, RefType } from '../constructors/types'

export abstract class StorageAbstract<T = any> {
  // eslint-disable-next-line no-useless-constructor
  protected constructor (
    protected readonly key: string,
    protected readonly value: Ref<T | undefined>
  ) {
  }

  get (): ComputedRef<T | undefined>
  get (value: RefType<T>): ComputedRef<T | undefined>
  get (callback: CallbackNullType<T>): ComputedRef<T | undefined>
  get (valueCallback?: RefOrCallbackType<T>): ComputedRef<T | undefined> {
    return computed<T | undefined>(() => {
      if (isFilled(this.value.value)) {
        return this.value.value
      } else if (valueCallback instanceof Function) {
        this.set(valueCallback())
        return this.value.value
      } else if (isRef(valueCallback)) {
        return valueCallback.value
      } else {
        return valueCallback
      }
    })
  }

  async getAsync (callback: CallbackNullType<T>): Promise<Ref<T | undefined>> {
    if (!isFilled(this.value.value)) {
      this.set(await callback())
    }

    return this.value
  }

  set (value: T): this {
    this.value.value = value
    return this
  }

  remove (): this {
    this.value.value = undefined
    return this
  }
}
