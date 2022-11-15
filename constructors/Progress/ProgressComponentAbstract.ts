import { computed, ComputedRef, Ref, ref, watch } from 'vue'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { props } from './props'
import {
  AssociativeType,
  ComponentClassesType,
  ComponentStylesType,
  EventCallbackRequiredType
} from '../types'

export type ProgressSetupType = {
  element: Ref<HTMLElement | undefined>
  tag: ComputedRef<string>
  name: ComputedRef<string>
  nameDesign: ComputedRef<string>
  baseClass: ComputedRef<string>
  classes: ComputedRef<ComponentClassesType>
  styles: ComputedRef<ComponentStylesType>
  valueInPercent: ComputedRef<string | undefined>
  onAnimation: EventCallbackRequiredType<void, AnimationEvent>
}

export abstract class ProgressComponentAbstract extends ComponentAbstract {
  protected readonly instruction = props as AssociativeType
  protected readonly element = ref<HTMLElement | undefined>()

  protected readonly move = ref(false)
  protected readonly visible = ref(false)

  protected timeout?: number

  constructor (
    props: object,
    context: object,
    nameDesign?: string
  ) {
    super(
      props,
      context,
      nameDesign
    )

    watch(this.refs.visible, () => this.watchVisible())
  }

  setup (): ProgressSetupType {
    const classes = this.getClasses({
      main: {
        'is-move': this.move,
        'is-value': this.valueInPercent,
        'is-visible': this.visible
      }
    })
    const styles = this.getStyles({})

    return {
      element: this.element,
      tag: this.tag,
      ...this.baseInit(),
      classes,
      styles,
      valueInPercent: this.valueInPercent,
      onAnimation: event => this.onAnimation(event)
    }
  }

  public readonly tag = computed(() => this.props.type !== 'linear' ? 'svg' : 'div') as ComputedRef<string>

  public readonly valueInPercent = computed(() => {
    if (typeof this.props.value === 'number') {
      return `${100 - (100 / (this.props.max || 100) * this.props.value)}%`
    } else {
      return undefined
    }
  }) as ComputedRef<string | undefined>

  protected watchVisible () {
    clearTimeout(this.timeout)

    this.timeout = setTimeout(() => {
      this.move.value = !this.refs.visible.value
      this.visible.value = !!this.refs.visible.value
    }, this.props.delay || 0)
  }

  protected onAnimation (event: AnimationEvent): void {
    if ([
      `${this.baseClass.value}--linear-hidden`,
      `${this.baseClass.value}--circle-hidden`
    ].indexOf(event.animationName) !== -1) {
      this.move.value = false
    }
  }
}
