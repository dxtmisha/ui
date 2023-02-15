import { computed, Ref, ref } from 'vue'
import { isFilled } from '../../functions'
import { FieldPrefixSetupType } from './types'

export class FieldPrefix {
  private readonly prefixElement = ref<HTMLElement | undefined>()
  private readonly prefixWidth = ref<string>('0px')

  private readonly suffixElement = ref<HTMLElement | undefined>()
  private readonly suffixWidth = ref<string>('0px')

  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly slots: object,
    private readonly prefix: Ref<string>,
    private readonly suffix: Ref<string>
  ) {
  }

  protected readonly isPrefix = computed<boolean>(() => isFilled(this.prefix.value) || 'prefix' in this.slots)
  protected readonly isSuffix = computed<boolean>(() => isFilled(this.suffix.value) || 'suffix' in this.slots)

  getSetup (): FieldPrefixSetupType {
    return {
      prefixElement: this.prefixElement,
      prefixWidth: this.prefixWidth,
      isPrefix: this.isPrefix,

      suffixElement: this.suffixElement,
      suffixWidth: this.suffixWidth,
      isSuffix: this.isSuffix
    }
  }

  getClass (): object {
    return { 'is-suffix': this.isSuffix }
  }

  update (): this {
    this.updatePrefix()
    this.updateSuffix()

    return this
  }

  private updatePrefix (): this {
    if (this.prefixElement.value) {
      this.prefixWidth.value = `${this.prefixElement.value.offsetWidth}px`
    } else {
      this.prefixWidth.value = '0px'
    }

    return this
  }

  private updateSuffix (): this {
    if (this.suffixElement.value) {
      this.suffixWidth.value = `${this.suffixElement.value.offsetWidth}px`
    } else {
      this.suffixWidth.value = '0px'
    }

    return this
  }
}
