import { computed, ComputedRef, onMounted, ref, watch } from 'vue'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { props } from './props'
import {
  AssociativeType,
  ComponentAssociativeType, ComponentBaseType,
  ComponentStylesType,
  EventCallbackRequiredType
} from '../types'

export type ProgressClassesType = {
  main: ComponentAssociativeType
  circle: ComponentAssociativeType
}

export type ProgressSetupType = ComponentBaseType & {
  ifCircular: ComputedRef<boolean>
  tag: ComputedRef<string>
  classes: ComputedRef<ProgressClassesType>
  styles: ComputedRef<ComponentStylesType>
  valueInPercent: ComputedRef<string | null>
  onAnimation: EventCallbackRequiredType<void, AnimationEvent>
}

export abstract class ProgressComponentAbstract extends ComponentAbstract {
  protected readonly instruction = props as AssociativeType

  protected readonly move = ref(false)
  protected readonly visible = ref(false)

  protected timeout?: number

  constructor (
    props: object,
    context: object
  ) {
    super(
      props,
      context
    )

    watch(this.refs.visible, () => this.watchVisible())
    onMounted(() => {
      if (this.props.visible) {
        this.watchVisible()
      }
    })
  }

  setup (): ProgressSetupType {
    const classes = this.getClasses<ProgressClassesType>({
      main: {
        'is-move': this.move,
        'is-value': this.valueInPercent,
        'is-visible': this.visible
      }
    })
    const styles = this.getStyles({})

    return {
      ifCircular: this.ifCircular,
      tag: this.tag,
      ...this.getBasic(),
      classes,
      styles,
      valueInPercent: this.valueInPercent,
      onAnimation: event => this.onAnimation(event)
    }
  }

  public readonly ifCircular = computed(() => this.props.type === 'circular') as ComputedRef<boolean>
  public readonly tag = computed(() => this.props.type !== 'linear' ? 'svg' : 'div') as ComputedRef<string>

  public readonly valueInPercent = computed(() => {
    if (typeof this.props.value === 'number') {
      return this.ifCircular.value
        ? `${(100 / (this.props.max || 100) * this.props.value)}`
        : `${100 - (100 / (this.props.max || 100) * this.props.value)}%`
    } else {
      return null
    }
  }) as ComputedRef<string | null>

  protected watchVisible () {
    clearTimeout(this.timeout)

    this.timeout = setTimeout(() => {
      this.move.value = !this.refs.visible.value
      this.visible.value = !!this.refs.visible.value
    }, this.props.delay || 0)
  }

  protected onAnimation (event: AnimationEvent): void {
    const className = this.getItem().getBasicClassName()

    if ([
      `${className}--linear-hidden`,
      `${className}--circle-hidden`
    ].indexOf(event.animationName) !== -1) {
      this.move.value = false
    }
  }
}
