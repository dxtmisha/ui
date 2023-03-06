import { computed, ComputedRef, Ref } from 'vue'
import { getExp } from '../../functions'

export type ListItemTextSetupType = {
  isText: ComputedRef<boolean>
  isFullText: ComputedRef<boolean>

  textBind: ComputedRef<string>
}

export class ListItemText {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly slots: object,
    private readonly text?: Ref<string | undefined>,
    private readonly textHighlight?: Ref<string | undefined>,
    private readonly prefix?: Ref<string | undefined>,
    private readonly suffix?: Ref<string | undefined>,
    private readonly description?: Ref<string | undefined>
  ) {
  }

  readonly item = computed<string>(() => this.text?.value && this.textHighlight?.value
    ? this.text?.value.replace(
      getExp(this.textHighlight?.value, 'ig', '(:value)'),
      (subtext: string) => `<span class="is-highlight">${subtext}</span>`
    )
    : this.text?.value || ''
  )

  readonly isItem = computed<boolean>(
    () => !!this.text?.value || this.isFullItem.value || 'default' in this.slots
  )

  readonly isFullItem = computed<boolean>(() => {
    return !!(
      this.textHighlight?.value ||
      this.prefix?.value ||
      this.suffix?.value ||
      this.description?.value
    )
  })

  is (): boolean {
    return this.isItem.value
  }

  isFull (): boolean {
    return this.isFullItem.value
  }

  get (): string {
    return this.item.value
  }

  getSetup (): ListItemTextSetupType {
    return {
      isText: this.isItem,
      isFullText: this.isFullItem,
      textBind: this.item
    }
  }
}
