import { computed, ref, Ref } from 'vue'
import { FieldArrow } from './FieldArrow'
import { FieldCancel } from './FieldCancel'
import { isFilled } from '../../functions'
import { FieldAlignSetupType } from './types'

export class FieldAlign {
  private readonly leftElement = ref<HTMLElement | undefined>()
  private readonly left = ref<string>('0px')
  private readonly leftHeight = ref<string>('0px')

  private readonly rightElement = ref<HTMLElement | undefined>()
  private readonly right = ref<string>('0px')
  private readonly rightHeight = ref<string>('0px')

  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly slots: object,
    private readonly arrow: FieldArrow,
    private readonly cancel: FieldCancel,
    private readonly icon: Ref<string | object>,
    private readonly iconTrailing: Ref<string | object>
  ) {
  }

  private readonly isLeft = computed<boolean>(
    () => this.arrow.isRight() ||
      isFilled(this.icon.value) ||
      'left' in this.slots
  )

  private readonly isRight = computed<boolean>(
    () => this.arrow.isLeft() ||
      isFilled(this.iconTrailing.value) ||
      'right' in this.slots ||
      this.cancel.is()
  )

  is (): boolean {
    return this.isLeft.value || this.isRight.value
  }

  getSetup (): FieldAlignSetupType {
    return {
      leftElement: this.leftElement,
      left: this.left,
      leftHeight: this.leftHeight,
      isLeft: this.isLeft,

      rightElement: this.rightElement,
      right: this.right,
      rightHeight: this.rightHeight,
      isRight: this.isRight
    }
  }

  update (): this {
    this.updateLeft()
    this.updateLeftHeight()

    this.updateRight()
    this.updateRightHeight()

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

  private updateLeftHeight (): this {
    this.leftHeight.value = `${this.leftElement.value?.offsetHeight || 0}px`

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

  private updateRightHeight (): this {
    this.rightHeight.value = `${this.rightElement.value?.offsetHeight || 0}px`

    return this
  }
}
