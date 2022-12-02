import { computed, ComputedRef, isRef, onBeforeUpdate, reactive, ref, Ref, toRefs } from 'vue'
import { ComponentDesign } from './ComponentDesign'
import { ComponentItem } from './ComponentItem'
import {
  forEach,
  replaceRecursive,
  toKebabCase
} from '../functions'

import {
  AssociativeType,
  ComponentAssociativeType,
  ComponentBaseType,
  ComponentClassesType,
  ComponentPropertyType,
  ComponentStylesType,
  NumberOrStringType
} from '../constructors/types'

export abstract class ComponentAbstract {
  static designMain: AssociativeType
  static emits?: string[]

  protected code = 'none' as string
  protected abstract readonly instruction: AssociativeType

  protected readonly element = ref<HTMLElement | undefined>()
  protected readonly classesProps = [] as string[]
  protected readonly stylesProps = [] as string[]

  abstract setup (): AssociativeType

  protected readonly props: AssociativeType
  protected readonly refs: AssociativeType<Ref>
  protected readonly context: AssociativeType
  protected readonly kebabCaseProperty = {} as AssociativeType<string>

  constructor (
    props: object,
    context: object
  ) {
    this.props = props
    this.refs = toRefs<AssociativeType>(props)
    this.context = context

    onBeforeUpdate(() => console.log(`onBeforeUpdate: ${this.code}`))
  }

  protected getItem (): ComponentItem {
    return ComponentDesign.getItem(
      this.code,
      this.instruction
    )
  }

  // OK
  protected readonly classesMain = computed(() => {
    const main = {
      [this.getItem().getBasicClassName()]: true
    }

    forEach<ComponentPropertyType, string, void>(this.getItem().getProperties(), (item, name) => {
      if (this.isPropDesign(name)) {
        if (typeof this.props[name] === 'boolean') {
          main[item.className] = true
        } else if (item?.values?.indexOf(this.props[name]) !== -1) {
          main[`${item.classValue}${this.props[name]}`] = true
        }
      }
    })

    return main
  }) as ComputedRef<ComponentAssociativeType>

  protected readonly stylesMain = computed(() => {
    const main = {} as AssociativeType<string>

    forEach<any, string, void>(this.instruction, (instruction, name) => {
      if (
        this.isPropDesign(name as string, this.stylesProps) &&
        typeof this.props[name] !== 'boolean' &&
        !this.isPropPropertyValue(name, this.props[name])
      ) {
        main[`--${this.getClassName([], [name])}`] = this.props[name]
      }
    })

    return main
  }) as ComputedRef<AssociativeType<string>>

  // OK
  protected getBasic (): ComponentBaseType {
    const item = this.getItem()

    return {
      element: this.element,
      name: item.getName(),
      design: item.getDesign(),
      className: item.getBasicClassName()
    }
  }

  getBind<T = any, R = AssociativeType> (value: Ref<T | R>): ComputedRef<R>
  getBind<T = any, R = AssociativeType> (value: Ref<T | R>, name: string): ComputedRef<R>
  getBind<T = any, R = AssociativeType> (value: Ref<T | R>, extra: AssociativeType | Ref<AssociativeType>): ComputedRef<R>
  getBind<T = any, R = AssociativeType> (value: Ref<T | R>, extra: AssociativeType | Ref<AssociativeType>, name: string): ComputedRef<R>
  getBind<T = any, R = AssociativeType> (
    value: Ref<T | R>,
    nameExtra = {} as string | AssociativeType | Ref<AssociativeType>,
    name = 'value' as string
  ): ComputedRef<R> {
    return computed(() => {
      const isName = typeof nameExtra === 'string'
      const extra = isName ? {} : nameExtra
      const data = (isRef(extra) ? extra.value : extra) || {}

      if (typeof value.value === 'object') {
        return {
          ...data,
          ...value.value
        } as R
      } else {
        return {
          ...data,
          [isName ? nameExtra : name]: value.value
        } as R
      }
    })
  }

  // DELETE
  protected getClassName (
    name = [] as string[],
    status = [] as NumberOrStringType[]
  ): string {
    return toKebabCase(
      `${[`${this.getItem().getBasicClassName()}`, ...name].join('__')}${status.length > 0 ? '--' : ''}${status.join('--')}`
    )
  }

  // OK
  getClasses<R = ComponentClassesType> (extra = {} as AssociativeType): ComputedRef<R> {
    return computed(() => {
      const classes = {
        main: this.classesMain.value,
        ...this.getItem().getSubClasses()
      } as AssociativeType

      return replaceRecursive(replaceRecursive({}, reactive(extra)), classes) as R
    })
  }

  protected getCodeProperty (name: string): string {
    return `${this.code}.${name}`
  }

  // DELETE
  protected getKebabCaseProperty (name: string): string {
    if (!(name in this.kebabCaseProperty)) {
      this.kebabCaseProperty[name] = toKebabCase(this.getCodeProperty(name))
    }

    return this.kebabCaseProperty[name]
  }

  getStyles (extra = {} as AssociativeType): ComputedRef<ComponentStylesType> {
    return computed(() => {
      const styles = {
        main: this.stylesMain.value
      }

      return replaceRecursive(replaceRecursive({}, reactive(extra)), styles) as ComponentStylesType
    })
  }

  protected isPropDesign (name: string, props = this.classesProps as string[]): boolean {
    return (
      this.props?.[name] && (
        props.length === 0 ||
        props.indexOf(name) !== -1
      )
    )
  }

  protected isPropPropertyValue (name: string, value: any): string | undefined {
    const nameClass = `${this.getKebabCaseProperty(name)}.${value}`
    return typeof value === 'string' && (nameClass in ComponentAbstract.designMain) ? nameClass : undefined
  }

  protected static isValue (code: string, index: string): boolean {
    return !!index.match(new RegExp(`^${code?.replace(/\./g, '\\.') || ''}`))
  }

  static {
    this.designMain = JSON.parse(process.env.VUE_APP_DESIGNS || '{}')
  }
}
