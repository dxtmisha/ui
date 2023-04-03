import { computed, ComputedRef, Ref, ref } from 'vue'
import { To } from './To'

import {
  ArrayOrStringType,
  AssociativeOrStringType,
  AssociativeStringType
} from '../constructors/types'

export class Translation {
  protected static url = process.env.VUE_APP_TRANSLATION || 'translation'

  protected static translations = ref({}) as Ref<AssociativeStringType>
  protected static requestList = [] as string[]

  static add (translations: AssociativeStringType | string) {
    let data

    if (typeof translations === 'string') {
      try {
        data = JSON.parse(translations)
      } catch (e) {
      }
    } else {
      data = translations
    }

    if (typeof data === 'object') {
      this.translations.value = {
        ...this.translations.value,
        ...data
      }
    }
  }

  static get (index: string): ComputedRef<string>
  static get (list: string[]): ComputedRef<AssociativeStringType>
  static get (indexList: ArrayOrStringType, replaces?: ComputedRef<AssociativeStringType>): ComputedRef<AssociativeOrStringType> {
    return computed<AssociativeOrStringType>(() => {
      if (Array.isArray(indexList)) {
        const data = {} as AssociativeStringType

        indexList.forEach(index => {
          data[index] = this.get(index).value
        })

        return data
      } else if (replaces && indexList in this.translations.value) {
        return To.replaceTemplate(this.translations.value[indexList], replaces.value)
      } else {
        return this.translations.value?.[indexList] || indexList
      }
    })
  }

  static request (list: string[]) {
    if (Array.isArray(list)) {
      this.requestList.push(...list)
    }
  }

  protected static initRequest () {
    if (this.requestList.length > 0) {
      // Close
    }
  }
}
