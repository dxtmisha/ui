import { onBeforeUpdate, onUpdated, Ref } from 'vue'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { ScrollbarBorder } from './ScrollbarBorder'
import { ScrollbarWidth } from './ScrollbarWidth'
import { props } from './props'
import {
  AssociativeType,
  ComponentBaseType
} from '../types'

export type ScrollbarSetupType = ComponentBaseType

export abstract class ScrollbarComponentAbstract extends ComponentAbstract {
  static readonly instruction = props as AssociativeType
  static readonly emits = [
    'on-before-update',
    'on-updated'
  ] as string[]

  private readonly border: ScrollbarBorder

  constructor (
    protected readonly props: AssociativeType & object,
    protected readonly context: AssociativeType & object
  ) {
    super(props, context)

    ScrollbarWidth.think()

    this.border = new ScrollbarBorder(
      this.element as Ref<HTMLElement>,
      this.refs.border
    )

    onBeforeUpdate(() => this.context.emit('on-before-update'))
    onUpdated(() => this.context.emit('on-updated'))
  }

  setup (): ScrollbarSetupType {
    const classes = this.getClasses({
      main: {
        'is-disabled': ScrollbarWidth.disabled,
        ...this.border.getStyle()
      }
    })

    return {
      ...this.getBasic(),
      classes
    }
  }
}
