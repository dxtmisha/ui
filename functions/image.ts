import {DefaultConfiguration} from "../classes/DefaultConfiguration";
import {ImageItemType} from "../constructors/types";

const defaultProps = DefaultConfiguration.init('image')
export const MAX_SIZE = defaultProps('MAX_SIZE', 600)() as number

export default function createImage(src: string | File): Promise<ImageItemType | undefined> {
  return new Promise(resolve => {
    if (src) {
      const image = new Image()

      image.onerror = () => resolve(undefined)
      image.onload = () => {
        resolve({
          image,
          height: image.naturalHeight,
          width: image.naturalWidth,
          src: getSRC(src, image)
        })
      }

      (async () => {
        image.src = src instanceof File ? await getFileResult(src) : src
      })()
    } else {
      resolve(undefined)
    }
  })
}

export function getFileResult(file: File): Promise<string> {
  return new Promise(resolve => {
    if (isImage(file)) {
      const reader = new FileReader()
      reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : '')
      reader.readAsDataURL(file)
    } else {
      resolve('')
    }
  })
}

export function getSRC(
  src: string | File,
  image: HTMLImageElement
): string {
  if (
    src instanceof File &&
    (
      image.naturalHeight > MAX_SIZE ||
      image.naturalWidth > MAX_SIZE
    )
  ) {
    const is = image.naturalWidth >= image.naturalHeight
    const canvas = document.createElement('canvas').getContext('2d')

    if (canvas) {
      canvas.canvas.width = is ? MAX_SIZE : (image.naturalWidth / image.naturalHeight * MAX_SIZE)
      canvas.canvas.height = is ? (image.naturalHeight / image.naturalWidth * MAX_SIZE) : MAX_SIZE
      canvas.drawImage(image, 0, 0, canvas.canvas.width, canvas.canvas.height)

      return canvas.canvas.toDataURL()
    } else {
      return ''
    }
  } else {
    return image.src
  }
}

export function isImage(file: File): boolean {
  return !!file.type.match(/^image\//)
}
