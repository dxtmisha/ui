import { computed, ComputedRef, isRef, onBeforeUpdate, reactive, ref, Ref, toRefs } from 'vue'
import {
  AssociativeType,
  ComponentAssociativeItemsType,
  ComponentAssociativeType,
  ComponentBaseType,
  ComponentClassesType,
  ComponentStylesType,
  NumberOrStringType
} from '../constructors/types'

import {
  forEach,
  replaceRecursive,
  toCamelCase,
  toKebabCase
} from '../functions'
import { getExp } from '../functions/data'
import { ComponentDesign } from './ComponentDesign'
import { ComponentItem } from './ComponentItem'

export abstract class ComponentAbstract {
  static designMain: AssociativeType
  static designSubClasses = {} as AssociativeType<ComponentAssociativeItemsType>
  static emits?: string[]

  protected code = 'none' as string
  protected abstract readonly instruction: AssociativeType

  protected readonly classesProps = [] as string[]
  protected readonly stylesProps = [] as string[]
  protected readonly element = ref<HTMLElement | undefined>()

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

  protected readonly classesMain = computed(() => {
    const main = {
      [this.getClassName()]: true
    }

    forEach<any, string, void>(this.instruction, (instruction, name) => {
      if (this.isPropDesign(name)) {
        if (typeof this.props[name] === 'boolean') {
          main[this.getClassName([], [name])] = this.props[name]
        } else {
          const className = this.getPropPropertyLinkOrValue(name, this.props[name])

          if (className) {
            main[className] = true
          } else if (this.isPropPropertyValue(name, this.props[name])) {
            main[this.getClassName([], [name, this.props[name]])] = true
          }
        }
      }
    })

    return main
  }) as ComputedRef<ComponentAssociativeType>

  protected readonly classesItems = computed(() => this.getClassesItems()) as ComputedRef<ComponentAssociativeItemsType>
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

  protected baseInit (): ComponentBaseType {
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
    const item = this.getItem()

    return toKebabCase(
      `${[`${item.getDesign()}-${item.getName()}`, ...name].join('__')}${status.length > 0 ? '--' : ''}${status.join('--')}`
    )
  }

  getClasses<R = ComponentClassesType> (extra = {} as AssociativeType): ComputedRef<R> {
    return computed(() => {
      const classes = {
        main: this.classesMain.value,
        ...this.classesItems.value
      } as AssociativeType

      return replaceRecursive(replaceRecursive({}, reactive(extra)), classes) as R
    })
  }

  protected getClassesItems (): ComponentAssociativeItemsType {
    return this.code ? { ...ComponentAbstract.getSubClasses(this.code) } : {}
  }

  protected getCodeProperty (name: string): string {
    return `${this.code}.${name}`
  }

  protected getKebabCaseProperty (name: string): string {
    if (!(name in this.kebabCaseProperty)) {
      this.kebabCaseProperty[name] = toKebabCase(this.getCodeProperty(name))
    }

    return this.kebabCaseProperty[name]
  }

  protected getPropPropertyLinkOrValue (name: string, value: any): string | undefined {
    const code = this.getKebabCaseProperty(name)

    if (
      code in ComponentAbstract.designMain &&
      ComponentAbstract.isType(ComponentAbstract.designMain[code], 'link-class')
    ) {
      const nameCode = `${ComponentAbstract.designMain[code]?.value}.${value}`

      return typeof value === 'string' && (nameCode in ComponentAbstract.designMain)
        ? nameCode
          .replace(/\./, '-')
          .replace(/\./g, '--')
        : undefined
    } else {
      return undefined
    }
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
    const code = this.getKebabCaseProperty(name)

    return (
      this.props?.[name] &&
      code in ComponentAbstract.designMain && (
        props.length === 0 ||
        props.indexOf(name) !== -1
      )
    )
  }

  protected isPropPropertyValue (name: string, value: any): string | undefined {
    const nameClass = `${this.getKebabCaseProperty(name)}.${value}`
    return typeof value === 'string' && (nameClass in ComponentAbstract.designMain) ? nameClass : undefined
  }

  protected static getSubClasses (code: string): ComponentAssociativeItemsType {
    if (!(code in this.designSubClasses)) {
      const classes = {} as ComponentAssociativeItemsType
      const reg = getExp(`${code}.`, 'i', '^:value')

      forEach<string | AssociativeType, string, void>(this.designMain, (type, name) => {
        if (
          this.isValue(code, name) &&
          this.isType(type, 'subclass')
        ) {
          const index = name.replace(reg, '')
          const names = `${code.replace('.', '-')}__${index.replace(/\./ig, '__')}`

          classes[toCamelCase(index)] = {
            [names]: true
          }
        }
      })

      this.designSubClasses[code] = classes
    }

    return this.designSubClasses[code]
  }

  protected static isType (type: string | AssociativeType, name: string): boolean {
    return typeof type === 'string'
      ? name === type
      : name === type?.type
  }

  protected static isValue (code: string, index: string): boolean {
    return !!index.match(new RegExp(`^${code?.replace(/\./g, '\\.') || ''}`))
  }

  static {
    this.designMain = JSON.parse(process.env.VUE_APP_DESIGNS || '{}')
  }
}
