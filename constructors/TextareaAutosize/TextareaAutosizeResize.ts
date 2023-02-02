import { onUnmounted, Ref, watch } from 'vue'
import { EventResize } from '../../classes/EventResize'

export class TextareaAutosizeResize {
  protected readonly event: EventResize<HTMLTextAreaElement>

  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly element: Ref<HTMLTextAreaElement | undefined>,
    protected readonly cloneElement: Ref<HTMLDivElement | undefined>
  ) {
    this.event = new EventResize(element, () => this.update()).go()

    watch(this.element, element => {
      if (!element) {
        this.event.stop()
      }
    })

    onUnmounted(() => this.event.stop())
  }

  update () {
    console.log('Up')
  }
}
