import { computed, ComputedRef, onBeforeUpdate, onUpdated, reactive, Ref, toRefs } from 'vue'
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

export abstract class ComponentAbstract {
  static designMain: AssociativeType
  static designSubClasses = {} as AssociativeType<ComponentAssociativeItemsType>

  protected code?: string
  protected abstract readonly instruction: AssociativeType

  protected readonly classesProps = [] as string[]

  abstract setup (): AssociativeType

  protected readonly props: AssociativeType
  protected readonly refs: AssociativeType<Ref>
  protected readonly context: AssociativeType

  constructor (
    props: object,
    context: object,
    nameDesign?: string
  ) {
    this.props = props
    this.refs = toRefs<AssociativeType>(props)
    this.context = context

    if (typeof nameDesign === 'string') {
      this.code = nameDesign
    }

    onBeforeUpdate(() => console.log(`onBeforeUpdate: ${this.baseClass.value}`))
  }

  private readonly name = computed(() => {
    const name = this.code
      ?.replace(/^([^.]+.)/ig, '')
      ?.replace('.', '-')

    return toKebabCase(name || '')
  }) as ComputedRef<string>

  protected readonly nameDesign = computed(() => toKebabCase(this.code?.split('.', 1)[0] || '')) as ComputedRef<string>
  protected readonly baseClass = computed(() => this.code?.replace('.', '-')) as ComputedRef<string>

  protected readonly classesMain = computed(() => {
    const main = {
      [this.getClassName()]: true
    }

    forEach<any, string, void>(this.instruction, (instruction, name) => {
      if (this.isPropDesign(name)) {
        if (typeof this.props[name] === 'boolean') {
          main[this.getClassName([], [name])] = this.props[name]
        } else if (this.isPropPropertyValue(name, this.props[name])) {
          main[this.getClassName([], [name, this.props[name]])] = true
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
        this.isPropDesign(name as string) &&
        typeof this.props[name] !== 'boolean' &&
        !this.isPropPropertyValue(name, this.props[name])
      ) {
        main[`--${this.getClassName([], [name])}`] = this.props[name]
      }
    })

    return main
  }) as ComputedRef<AssociativeType<string>>

  protected baseInit (): ComponentBaseType {
    return {
      name: this.name,
      nameDesign: this.nameDesign,
      baseClass: this.baseClass
    }
  }

  protected getClassName (
    name = [] as string[],
    status = [] as NumberOrStringType[]
  ): string {
    return `${[`${this.nameDesign.value}-${this.name.value}`, ...name].join('__')}${status.length > 0 ? '--' : ''}${status.join('--')}`
  }

  getClasses (extra = {} as AssociativeType): ComputedRef<ComponentClassesType> {
    return computed(() => {
      const classes = {
        main: this.classesMain.value,
        ...this.classesItems.value
      } as ComponentClassesType

      return replaceRecursive(replaceRecursive({}, reactive(extra)), classes) as ComponentClassesType
    })
  }

  protected getClassesItems (): ComponentAssociativeItemsType {
    return this.code ? { ...ComponentAbstract.getSubClasses(this.code) } : {}
  }

  protected getCodeProperty (name: string): string {
    return `${this.code}.${name}`
  }

  getStyles (extra = {} as AssociativeType): ComputedRef<ComponentStylesType> {
    return computed(() => {
      const styles = {
        main: this.stylesMain.value
      }

      return replaceRecursive(replaceRecursive({}, reactive(extra)), styles) as ComponentStylesType
    })
  }

  protected isPropDesign (name: string): boolean {
    const code = this.getCodeProperty(name)

    return (
      this.props?.[name] &&
      code in ComponentAbstract.designMain && (
        this.classesProps.length === 0 ||
        this.classesProps.indexOf(name) !== -1
      )
    )
  }

  protected isPropPropertyValue (name: string, value: any): boolean {
    return typeof value === 'string' &&
      (`${this.getCodeProperty(name)}.${value}` in ComponentAbstract.designMain)
  }

  protected static getSubClasses (code: string): ComponentAssociativeItemsType {
    if (!(code in this.designSubClasses)) {
      const classes = {} as ComponentAssociativeItemsType

      forEach<string, string, void>(this.designMain, (type, name) => {
        if (
          this.isValue(code, name) &&
          type === 'subclass'
        ) {
          const index = toCamelCase(name.replace('#', ''))
          const names = name.replace(/\./ig, '-')
            .replace(/#/ig, '-')

          classes[index] = {
            [names]: true
          }
        }
      })

      this.designSubClasses[code] = classes
    }

    return this.designSubClasses[code]
  }

  protected static isValue (code: string, index: string): boolean {
    return !!index.match(new RegExp(`^${code?.replace(/\./g, '\\.') || ''}`))
  }

  static {
    this.designMain = JSON.parse(process.env.VUE_APP_DESIGNS || '{}')
  }
}
