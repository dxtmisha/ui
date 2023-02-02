import { onUnmounted, Ref, watchEffect } from 'vue'
import { EventResize } from '../../classes/EventResize'
import { BooleanOrNumberOrStringType } from '../types'

export class TextareaAutosizeResize {
  protected readonly event: EventResize<HTMLTextAreaElement>

  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly element: Ref<HTMLTextAreaElement | undefined>,
    protected readonly cloneElement: Ref<HTMLDivElement | undefined>,
    protected readonly value: Ref<BooleanOrNumberOrStringType>
  ) {
    this.event = new EventResize(element, () => this.update()).go()
    this.update()

    watchEffect(() => this.resize())
    onUnmounted(() => this.event.stop())
  }

  protected resize (): void {
    if (
      this.element.value &&
      this.cloneElement.value
    ) {
      this.cloneElement.value.innerText = `${this.value.value} --`
      this.element.value.style.height = `${this.cloneElement.value.offsetHeight}px`
    }
  }

  protected update (): void {
    if (
      this.element.value &&
      this.cloneElement.value
    ) {
      const style = getComputedStyle(this.element.value)

      this.cloneElement.value.style.paddingTop = style.paddingTop
      this.cloneElement.value.style.paddingRight = style.paddingRight
      this.cloneElement.value.style.paddingBottom = style.paddingBottom
      this.cloneElement.value.style.paddingLeft = style.paddingLeft
      this.cloneElement.value.style.width = `${this.element.value.offsetWidth}px`
    }
  }
}
