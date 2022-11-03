import { computed, ComputedRef, reactive, Ref, toRefs } from 'vue'
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
  toKebabCase
} from '../functions'

export abstract class ComponentAbstract {
  static designMain: AssociativeType

  protected abstract readonly design: AssociativeType
  protected abstract readonly instruction: AssociativeType

  protected readonly classesProps = [] as string[]

  abstract setup (): AssociativeType

  protected readonly props: AssociativeType
  protected readonly refs: AssociativeType<Ref>
  protected readonly context: AssociativeType

  constructor (props: object, context: object) {
    this.props = props
    this.refs = toRefs<AssociativeType>(props)
    this.context = context
  }

  private readonly name = computed(() => toKebabCase(this.getObjectDesign()?.[0])) as ComputedRef<string>
  private readonly nameDesign = computed(() => toKebabCase(Object.entries(this.design)?.[0]?.[0])) as ComputedRef<string>
  private readonly code = computed(() => `${this.nameDesign.value}.${this.name.value}`) as ComputedRef<string>
  private readonly properties = computed(() => this.getObjectDesign()?.[1]) as ComputedRef<AssociativeType>
  private readonly baseClass = computed(() => `.${this.nameDesign.value}-${this.name.value}`) as ComputedRef<string>

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

  protected getClassesItems (
    props = this.properties.value as AssociativeType,
    parent = [] as string[]
  ): ComponentAssociativeItemsType {
    const classes = {} as ComponentAssociativeItemsType

    forEach<AssociativeType, string, void>(props, (prop, name) => {
      if (name.match(/^#/)) {
        const index = name.replace(/^#/, '')
        const names = [...parent, index]

        classes[names.join('.')] = {
          [this.getClassName(names)]: true
        }

        Object.assign(classes, this.getClassesItems(prop, names))
      }
    })

    return classes
  }

  protected getCodeProperty (name: string): string {
    return `${this.code.value}.${name}`
  }

  protected getObjectDesign (): AssociativeType {
    return Object.entries(Object.entries(this.design)?.[0]?.[1] || {})?.[0]
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

  static {
    this.designMain = JSON.parse(process.env.VUE_APP_DESIGNS || '{}')
  }
}
