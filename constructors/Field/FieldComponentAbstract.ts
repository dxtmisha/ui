import { computed, ComputedRef } from 'vue'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { props } from './props'
import {
  AssociativeType,
  ComponentAssociativeType,
  ComponentBaseType
} from '../types'
import { getIdElement } from '../../functions'

export type FieldClassesType = {
  main: ComponentAssociativeType
  body: ComponentAssociativeType
  input: ComponentAssociativeType
  hidden: ComponentAssociativeType
  label: ComponentAssociativeType
  title: ComponentAssociativeType
  text: ComponentAssociativeType
  required: ComponentAssociativeType
  border: ComponentAssociativeType
}
export type FieldSetupType = ComponentBaseType & {
  classes: ComputedRef<FieldClassesType>
  id: string
  left: ComputedRef<string>
  right: ComputedRef<string>
}

export abstract class FieldComponentAbstract extends ComponentAbstract {
  static readonly instruction = props as AssociativeType
  static readonly emits = [
    'on-previous',
    'on-next',
    'on-cancel',
    'on-trailing'
  ] as string[]

  private readonly id: string

  constructor (
    protected readonly props: AssociativeType & object,
    protected readonly context: AssociativeType & object
  ) {
    super(props, context)

    this.id = `field--id--${getIdElement()}`
  }

  setup (): FieldSetupType {
    const classes = this.getClasses<FieldClassesType>()
    const styles = this.getStyles()

    return {
      ...this.getBasic(),
      classes,
      styles,
      id: this.id,
      left: this.left,
      right: this.right
    }
  }

  protected readonly left = computed<string>(() => '0px')
  protected readonly right = computed<string>(() => '0px')
}
