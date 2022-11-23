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

export abstract class ComponentAbstract {
  static designMain: AssociativeType
  static designSubClasses = {} as AssociativeType<ComponentAssociativeItemsType>

  protected code?: string
  protected abstract readonly instruction: AssociativeType

  protected readonly classesProps = [] as string[]
  protected readonly element = ref<HTMLElement | undefined>()

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
      element: this.element,
      name: this.name,
      nameDesign: this.nameDesign,
      baseClass: this.baseClass
    }
  }

  getBind<T = any, R = AssociativeType> (
    value: Ref<T | R>,
    extra = {} as AssociativeType | Ref<AssociativeType>,
    name = 'value' as string
  ): ComputedRef<R> {
    return computed(() => {
      const data = isRef(extra) ? (extra.value || {}) : extra

      if (typeof value.value === 'object') {
        return {
          ...data,
          ...value.value
        } as R
      } else {
        return {
          ...data,
          [name]: value.value
        } as R
      }
    })
  }

  protected getClassName (
    name = [] as string[],
    status = [] as NumberOrStringType[]
  ): string {
    return toKebabCase(
      `${[`${this.nameDesign.value}-${this.name.value}`, ...name].join('__')}${status.length > 0 ? '--' : ''}${status.join('--')}`
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
    return toKebabCase(this.getCodeProperty(name))
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

  protected isPropDesign (name: string): boolean {
    const code = this.getKebabCaseProperty(name)

    return (
      this.props?.[name] &&
      code in ComponentAbstract.designMain && (
        this.classesProps.length === 0 ||
        this.classesProps.indexOf(name) !== -1
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
    console.log('ComponentAbstract.designMain', ComponentAbstract.designMain)
  }
}
