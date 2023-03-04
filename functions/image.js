'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.isImage = exports.getSRC = exports.getFileResult = exports.createImage = exports.MAX_SIZE = void 0
exports.MAX_SIZE = 600
function createImage (src) {
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
      };
      (async () => {
        image.src = src instanceof File ? await getFileResult(src) : src
      })()
    } else {
      resolve(undefined)
    }
  })
}
exports.createImage = createImage
function getFileResult (file) {
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
exports.getFileResult = getFileResult
function getSRC (image, src, maxSize = exports.MAX_SIZE) {
  if ((src instanceof File || src === undefined) &&
        (image.naturalHeight > maxSize ||
            image.naturalWidth > maxSize)) {
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
exports.getSRC = getSRC
function isImage (file) {
  return !!file.type.match(/^image\//)
}
exports.isImage = isImage
exports.default = {
  createImage,
  getFileResult,
  getSRC,
  isImage
}
// # sourceMappingURL=image.js.map
