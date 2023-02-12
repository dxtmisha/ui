import { computed, nextTick, Ref, ref } from 'vue'

export class WindowOpen {
  private readonly open = ref<boolean>(false)
  private readonly first = ref<boolean>(false)

  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly inDom: Ref<boolean>,
    private readonly beforeOpening: Ref<(status: boolean) => boolean>
  ) {
  }

  readonly is = computed<boolean>(() => this.open.value || (this.first.value && this.inDom.value))

  async toggle () {
    const toOpen = !this.open.value

    if (
      !this.beforeOpening.value ||
      await this.beforeOpening.value(toOpen)
    ) {
      if (toOpen) {
        this.setStatus('preparation')
        this.open.value = toOpen
        this.openFirst.value = toOpen

        await nextTick()
        await this.watchPosition()

        requestAnimationFrame(() => {
          this.setStatus('open')
          this.eventStatus.go()
          this.callbackOpening()
        })
      } else {
        this.setStatus('hide')
        this.eventStatus.stop()
      }

      this.emitWindow({
        open: toOpen,
        element: this.element.value,
        control: this.elements.getControl(),
        id: this.elements.getId()
      })
    }
  }
}
