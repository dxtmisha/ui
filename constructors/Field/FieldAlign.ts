import { computed, ref, Ref } from 'vue'
import { FieldCancel } from './FieldCancel'
import { isFilled } from '../../functions'
import { FieldAlignSetupType } from './types'

export class FieldAlign {
  private readonly leftElement = ref<HTMLElement | undefined>()
  private readonly left = ref<string>('0px')

  private readonly rightElement = ref<HTMLElement | undefined>()
  private readonly right = ref<string>('0px')

  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly slots: object,
    private readonly cancel: FieldCancel,
    private readonly icon: Ref<string | object>,
    private readonly iconTrailing: Ref<string | object>,
    private readonly align: Ref<string>,
    private readonly arrow: Ref<boolean>
  ) {
  }

  private readonly isLeft = computed<boolean>(
    () => (isFilled(this.arrow.value) && this.align.value !== 'right') ||
      isFilled(this.icon.value) ||
      'left' in this.slots
  )

  private readonly isRight = computed<boolean>(
    () => (isFilled(this.arrow.value) && this.align.value !== 'left') ||
      isFilled(this.iconTrailing.value) ||
      'right' in this.slots ||
      this.cancel.is()
  )

  getSetup (): FieldAlignSetupType {
    return {
      leftElement: this.leftElement,
      left: this.left,
      isLeft: this.isLeft,

      rightElement: this.rightElement,
      right: this.right,
      isRight: this.isRight
    }
  }

  update (): this {
    this.updateLeft()
    this.updateRight()

    return this
  }

  private updateLeft (): this {
    if (this.isLeft.value) {
      this.left.value = `${this.leftElement.value?.offsetWidth}px`
    } else {
      this.left.value = '0px'
    }
    return this
  }

  private updateRight (): this {
    if (this.isRight.value) {
      this.right.value = `${this.rightElement.value?.offsetWidth}px`
    } else {
      this.right.value = '0px'
    }

    return this
  }
}
