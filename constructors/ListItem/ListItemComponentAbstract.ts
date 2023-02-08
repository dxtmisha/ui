import { computed, ComputedRef } from 'vue'
import { ButtonComponentItemAbstract } from '../Button/ButtonComponentItemAbstract'
import { props } from './props'
import {
  AssociativeType,
  ComponentAssociativeType,
  ComponentBaseType,
  EventCallbackRequiredType
} from '../types'
import { getExp } from '../../functions'
import { toKebabCase } from '../../functions/data'

export type ListItemClassesType = {
  main: ComponentAssociativeType
  description: ComponentAssociativeType
  context: ComponentAssociativeType
  prefix: ComponentAssociativeType
  suffix: ComponentAssociativeType
  text: ComponentAssociativeType
  title: ComponentAssociativeType
}
export type ListItemSetupType = ComponentBaseType & {
  classes: ComputedRef<ListItemClassesType>
  isFullText: ComputedRef<boolean>
  textBind: ComputedRef<string>
  iconBind: ComputedRef<string | AssociativeType>
  iconTrailingBind: ComputedRef<string | AssociativeType>
  progressIconBind: ComputedRef<AssociativeType>
  progressTextBind: ComputedRef<AssociativeType>
  onClick: EventCallbackRequiredType<void, MouseEvent>
}

export abstract class ListItemComponentAbstract extends ButtonComponentItemAbstract {
  static readonly instruction = props as AssociativeType
  static readonly emits = ['on-click', 'on-trailing'] as string[]

  protected abstract appearanceInverse: string[]
  protected readonly stylesProps = [''] as string[]

  setup (): ListItemSetupType {
    const classes = this.getClasses<ListItemClassesType>()
    const styles = this.getStyles()

    return {
      ...this.getBasic(),
      classes,
      styles,
      isFullText: this.isFullText,
      textBind: this.text,
      iconBind: this.getBind(this.refs.icon, this.icon, 'icon'),
      iconTrailingBind: this.getBind(this.refs.iconTrailing, this.iconTrailing, 'icon'),
      progressIconBind: this.progressIcon,
      progressTextBind: this.progressText,
      onClick: (event: MouseEvent) => this.onClick(event)
    }
  }

  readonly isFullText = computed(() => {
    return !!(
      this.props.description ||
      this.props.prefix ||
      this.props.suffix ||
      this.props.textHighlight
    )
  })

  readonly isInverse = computed(() => {
    return this.props.selected && (
      this.appearanceInverse.indexOf(this.props.appearance) !== -1 ||
      this.appearanceInverse.indexOf('all') !== -1
    )
  }) as ComputedRef<boolean>

  readonly progressIcon = computed(() => {
    return {
      inverse: this.isInverse.value,
      type: 'circular',
      visible: true
    }
  })

  readonly progressText = computed(() => {
    return {
      inverse: this.isInverse.value,
      visible: true
    }
  })

  readonly text = computed(() => this.props.text && this.props.textHighlight
    ? this.props.text.replace(
      getExp(this.props.textHighlight, '(:value)'),
      (subtext: string) => `<span class="is-highlight">${subtext}</span>`
    )
    : this.props.text
  ) as ComputedRef<string>
}
