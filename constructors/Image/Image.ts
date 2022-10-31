import {computed, ComputedRef, ref, Ref, watchEffect} from "vue";
import {ImageCoordinatorType, ImageItemType, ImageOptionType, ImageTypeType, ImageValueType} from "../types";
import {Icon} from "./Icon";
import createImage from "../../functions/image";

export class Image {
  readonly dataImage: Ref<ImageItemType | string | undefined>
  readonly adaptiveX: Ref<number>
  readonly adaptiveY: Ref<number>

  constructor(
    public readonly image: ImageValueType,
    public readonly coordinator: ImageCoordinatorType,
    public readonly size: ImageOptionType,
    public readonly x: ImageOptionType,
    public readonly y: ImageOptionType,
    public readonly adaptive: Ref<boolean>,
    public readonly url: Ref<string>,
    public readonly className: string
  ) {
    this.dataImage = ref(undefined)
    this.adaptiveX = ref(0)
    this.adaptiveY = ref(0)

    watchEffect(() => this.update())
  }

  private async update() {
    switch (this.type.value) {
      case 'image':
      case 'file':
        this.dataImage.value = await createImage(this.image.value)
        break
      case 'public':
        return Icon.get(
          this.image.value as string,
          this.url.value
        )
    }
  }

  public readonly backgroundImage = computed(() => {
    const dataImage = this.dataImage.value

    return dataImage ? `url("${typeof dataImage === 'string' ? dataImage : dataImage.src}")` : null
  }) as ComputedRef<string | null>

  public readonly classes = computed(() => {
    const type = this.type.value
    const data = {[`is-type--${type}`]: true}

    switch (type) {
      case 'la':
      case 'lab':
        if (typeof this.image.value === "string") {
          data[`lab ${this.image.value.replace('lab-', 'la-')}`] = true
        }

        break
      case 'filled':
      case 'outlined':
      case 'round':
      case 'sharp':
      case 'two-tone':
      case 'material':
        data['material-icons'] = true
        break
      case 'public':
        data[`is-public`] = true
        break
    }

    return data
  }) as ComputedRef<object>

  public readonly styles = computed(() => {
    const image = this.image.value

    switch (this.type.value) {
      case 'image':
        return {
          'background-image': this.backgroundImage.value,
        }
      case 'public':
        return {'mask-image': this.backgroundImage.value}
      case 'color':
        return {'background-color': image}
    }

    return undefined
  })

  public text = computed(() => {
    const image = this.image.value
    const type = this.type.value

    if (
      type &&
      typeof image === 'string' &&
      [
        'filled',
        'outlined',
        'round',
        'sharp',
        'two-tone',
        'material'
      ].indexOf(type) !== -1
    ) {
      return image.replace(/^(filled|outlined|round|sharp|two-tone)-/, '')
    } else {
      return undefined
    }
  }) as ImageOptionType

  public readonly type = computed(() => {
    const image = this.image.value

    if (image) {
      if (image instanceof File) {
        return 'file'
      } else if (image.match(/\//)) {
        return 'image'
      } else if (image.match(/^#/)) {
        return 'color'
      } else if (image.match(/^@/)) {
        return 'public'
      } else {
        return image.match(/^(la|lab|filled|outlined|round|sharp|two-tone)-/)?.[1] || 'material'
      }
    } else {
      return undefined
    }
  }) as ImageTypeType
}
