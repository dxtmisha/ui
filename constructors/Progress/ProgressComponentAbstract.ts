import { computed, onMounted, ref, watch } from 'vue'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { props } from './props'
import { AssociativeType } from '../types'
import { ProgressClassesType, ProgressSetupType } from './types'

export abstract class ProgressComponentAbstract extends ComponentAbstract {
  static readonly instruction = props as AssociativeType

  private readonly move = ref<boolean>(false)
  private readonly visible = ref<boolean>(false)

  private timeout?: number

  constructor (
    props: AssociativeType & object,
    context: AssociativeType & object
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

    return {
      ...this.getBasic(),
      classes,
      tag: this.tag,
      isCircular: this.isCircular,
      valueInPercent: this.valueInPercent,
      onAnimation: event => this.onAnimation(event)
    }
  }

  private readonly isCircular = computed<boolean>(() => this.props.type === 'circular')
  private readonly tag = computed<string>(() => this.props.type !== 'linear' ? 'svg' : 'div')

  private readonly valueInPercent = computed<string | null>(() => {
    if (typeof this.props.value === 'number') {
      return this.isCircular.value
        ? `${(100 / (this.props.max || 100) * this.props.value)}`
        : `${100 - (100 / (this.props.max || 100) * this.props.value)}%`
    } else {
      return null
    }
  })

  private watchVisible () {
    clearTimeout(this.timeout)

    this.timeout = setTimeout(() => {
      this.move.value = !this.refs.visible.value
      this.visible.value = !!this.refs.visible.value
    }, this.props.delay || 0)
  }

  private onAnimation (event: AnimationEvent): void {
    const className = this.getItem().getBasicClassName()

    if ([
      `${className}--linear-hidden`,
      `${className}--circle-hidden`
    ].indexOf(event.animationName) !== -1) {
      this.move.value = false
    }
  }
}
