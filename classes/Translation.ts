import { computed, ComputedRef, Ref, ref } from 'vue'
import { AssociativeStringType } from '../constructors/types'

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

  static get (index: string): ComputedRef<string> {
    return computed<string>(() => {
      return this.translations.value?.[index] || ''
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
