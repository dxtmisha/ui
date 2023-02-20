import { computed, ComputedRef } from 'vue'
import { useRouter } from 'vue-router'
import { ComponentAbstract } from '../../classes/ComponentAbstract'

export abstract class ButtonComponentItemAbstract extends ComponentAbstract {
  // DELETE
  readonly isRipple = computed(() => this.props.ripple && !this.isStatic.value) as ComputedRef<boolean>

  // DELETE
  readonly isStatic = computed(() => {
    return this.props?.readonly ||
      this.props?.disabled ||
      this.props?.progress
  }) as ComputedRef<boolean>

  readonly icon = computed(() => {
    return {
      active: this.props.selected,
      disabled: this.props.disabled
    }
  })

  readonly iconTrailing = computed(() => {
    return {
      class: 'is-trailing',
      disabled: this.props.disabled,
      inEnd: true,
      turn: this.props.turn
    }
  })

  readonly value = computed(() => this.props.value || this.props.detail?.value)

  onClick (event: MouseEvent): void {
    let type = 'on-click'

    if (this.isStatic.value) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      if (
        (event.target as HTMLElement)?.closest('.is-trailing')
      ) {
        event.preventDefault()
        event.stopPropagation()
        type = 'on-trailing'
      } else if (this.props?.to) {
        this.toRouter().then()
        return
      }

      this.context.emit(type, {
        type,
        detail: this.props?.detail,
        value: this.value.value
      })
    }
  }

  protected toRouter () {
    const router = useRouter()
    return router.push(this.props.to)
  }
}
