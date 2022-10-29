import {computed, ComputedRef, Ref, toRefs} from "vue";
import {
  AssociativeType,
  ComponentAssociativeItemsType,
  ComponentAssociativeType,
  ComponentBaseType,
  ComponentClassesType,
  ComponentStylesType,
  NumberOrStringType
} from "../constructors/types";

import {
  forEach,
  replaceRecursive,
  toKebabCase
} from "../functions";

export abstract class ComponentAbstract {
  protected abstract readonly design: AssociativeType
  protected abstract readonly instruction: AssociativeType

  protected readonly classesProps = [] as string[]

  abstract setup(): AssociativeType

  protected readonly props: AssociativeType
  protected readonly refs: AssociativeType<Ref>
  protected readonly context: AssociativeType

  constructor(props: object, context: object) {
    this.props = props
    this.refs = toRefs<AssociativeType>(props)
    this.context = context
  }

  private readonly name = computed(() => toKebabCase(this.getObjectDesign()?.[0])) as ComputedRef<string>
  private readonly nameDesign = computed(() => toKebabCase(Object.entries(this.design)?.[0]?.[0])) as ComputedRef<string>
  private readonly properties = computed(() => this.getObjectDesign()?.[1]) as ComputedRef<AssociativeType>
  private readonly baseClass = computed(() => `.${this.nameDesign.value}-${this.name.value}`) as ComputedRef<string>

  protected readonly classesMain = computed(() => {
    const main = {
      [this.getClassName()]: true
    }

    forEach(this.instruction, (instruction, name) => {
      if (this.isPropDesign(name as string)) {
        if (typeof this.props[name] === 'boolean') {
          main[this.getClassName([], [name])] = this.props[name]
        } else if (this.props[name] in this.properties.value[name]) {
          main[this.getClassName([], [name, this.props[name]])] = true
        }
      }
    })

    return main
  }) as ComputedRef<ComponentAssociativeType>
  protected readonly classesItems = computed(() => this.getClassesItems()) as ComputedRef<ComponentAssociativeItemsType>
  protected readonly stylesMain = computed(() => {
    const main = {} as AssociativeType<string>

    forEach(this.instruction, (instruction, name) => {
      if (
        this.isPropDesign(name as string) &&
        typeof this.props[name] !== 'boolean' &&
        !(this.props?.[name] in this.properties.value[name])
      ) {
        main[`--${this.getClassName([], [name])}`] = this.props[name]
      }
    })

    return main
  }) as ComputedRef<AssociativeType<string>>

  protected baseInit(): ComponentBaseType {
    return {
      name: this.name,
      nameDesign: this.nameDesign,
      baseClass: this.baseClass
    }
  }

  protected getClassName(
    name = [] as string[],
    status = [] as NumberOrStringType[]
  ): string {
    return `${[`${this.nameDesign.value}-${this.name.value}`, ...name].join('__')}${status.join('--')}`
  }

  getClasses(extra = {} as ComponentClassesType): ComputedRef<ComponentClassesType> {
    return computed(() => {
      const classes = {
        main: this.classesMain.value,
        ...this.classesItems.value
      } as ComponentClassesType

      return replaceRecursive(extra, classes) as ComponentClassesType
    })
  }

  protected getClassesItems(
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

  protected getObjectDesign(): AssociativeType {
    return Object.entries(Object.entries(this.design)?.[0]?.[1] || {})?.[0]
  }

  getStyles(extra = {} as ComponentStylesType): ComputedRef<ComponentStylesType> {
    return computed(() => {
      const styles = {
        main: this.stylesMain.value
      }

      return replaceRecursive(extra, styles) as ComponentStylesType
    })
  }

  protected isPropDesign(name: string): boolean {
    return (
      this.props?.[name] &&
      name in this.properties.value && (
        this.classesProps.length === 0 ||
        this.classesProps.indexOf(name) !== -1
      )
    )
  }
}
