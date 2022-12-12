import {
  computed,
  ComputedRef,
  isRef,
  onBeforeUpdate,
  onUpdated,
  reactive,
  ref,
  Ref,
  toRefs
} from 'vue'
import { ComponentDesign } from './ComponentDesign'
import { ComponentItem } from './ComponentItem'
import {
  forEach,
  replaceRecursive
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
  static readonly code = 'none' as string
  static readonly instruction = {} as AssociativeType
  static readonly emits?: string[]

  static getComponentItem (): ComponentItem {
    return ComponentDesign.getItem(
      this.code,
      this.instruction
    )
  }

  static getProps<R = AssociativeType> (): R {
    return this.getComponentItem().getProps() as R
  }

  protected readonly element = ref<HTMLElement | undefined>()
  protected readonly refs: AssociativeType<Ref>
  protected readonly classesProps = [] as string[]
  protected readonly stylesProps = [] as string[]

  abstract setup (): AssociativeType

  constructor (
    protected readonly props: AssociativeType & object,
    protected readonly context: AssociativeType & object
  ) {
    this.refs = toRefs<AssociativeType>(props)

    onBeforeUpdate(() => console.log(`onBeforeUpdate: ${this.getConstructor().code}`))
    // onUpdated(() => console.log(`onUpdated: ${this.getConstructor().code}`))
  }

  protected getConstructor<T = typeof ComponentAbstract> () {
    return this.constructor as T
  }

  protected getItem (): ComponentItem {
    return this.getConstructor().getComponentItem()
  }

  protected getName (): string {
    return this.getItem().getBasicClassName()
  }

  protected getSelector (): string {
    return `.${this.getName()}`
  }

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

    forEach<ComponentPropertyType, string, void>(this.getItem().getProperties(), (item, name) => {
      if (
        this.isPropDesign(name, this.stylesProps) &&
        typeof this.props[name] !== 'boolean' &&
        item?.values?.indexOf(this.props[name]) === -1
      ) {
        main[`--${item.classStyle}`] = this.props[name]
      }
    })

    return main
  }) as ComputedRef<AssociativeType<string>>

  protected emitGo (name: string, values: any): this {
    this.context.emit(name, values)
    return this
  }

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

  protected getClassName (
    name = [] as string[],
    status = [] as NumberOrStringType[]
  ): string {
    return this.getItem().getClassName(name, status)
  }

  getClasses<R = ComponentClassesType> (extra?: AssociativeType): ComputedRef<R> {
    return computed(() => {
      const classes = {
        main: this.classesMain.value,
        ...this.getItem().getSubClasses()
      } as AssociativeType

      if (extra) {
        return replaceRecursive(replaceRecursive({}, reactive(extra)), classes) as R
      } else {
        return classes as R
      }
    })
  }

  getStyles (extra?: AssociativeType): ComputedRef<ComponentStylesType> {
    return computed(() => {
      const styles = {
        main: this.stylesMain.value
      }

      if (extra) {
        return replaceRecursive(replaceRecursive({}, reactive(extra)), styles) as ComponentStylesType
      } else {
        return styles as ComponentStylesType
      }
    })
  }

  protected isPropDesign (
    name: string,
    props = this.classesProps as string[]
  ): boolean {
    return (
      this.props?.[name] && (
        props.length === 0 ||
        props.indexOf(name) !== -1
      )
    )
  }
}
