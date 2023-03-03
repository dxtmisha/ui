import { ImageItemType } from '../constructors/types'

export const MAX_SIZE = 600 as number

export function createImage (src: string | File): Promise<ImageItemType | undefined> {
  return new Promise(resolve => {
    if (src) {
      const image = new Image()

      image.onerror = () => resolve(undefined)
      image.onload = () => {
        resolve({
          image,
          height: image.naturalHeight,
          width: image.naturalWidth,
          src: getSRC(image, src)
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

export function getFileResult (file: File): Promise<string> {
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

export function getSRC (
  image: HTMLImageElement,
  src?: string | File,
  maxSize = MAX_SIZE as number
): string {
  if (
    (src instanceof File || src === undefined) &&
    (
      image.naturalHeight > maxSize ||
      image.naturalWidth > maxSize
    )
  ) {
    const is = image.naturalWidth >= image.naturalHeight
    const canvas = document.createElement('canvas').getContext('2d')

    if (canvas) {
      canvas.canvas.width = is ? maxSize : (image.naturalWidth / image.naturalHeight * maxSize)
      canvas.canvas.height = is ? (image.naturalHeight / image.naturalWidth * maxSize) : maxSize
      canvas.drawImage(image, 0, 0, canvas.canvas.width, canvas.canvas.height)

      return canvas.canvas.toDataURL()
    } else {
      return ''
    }
  } else {
    return image.src
  }
}

export function isImage (file: File): boolean {
  return !!file.type.match(/^image\//)
}

export default {
  createImage,
  getFileResult,
  getSRC,
  isImage
}
