'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.FileImage = exports.MAX_SIZE = void 0
exports.MAX_SIZE = 600
/**
 * Class for working with uploaded images
 *
 * Класс для работы с загруженными изображениями
 */
class FileImage {
  /**
     * Checks if the file is an image
     *
     * Проверяет, является ли файл изображением
     * @param file verified file / проверяемый файл
     */
  static isImage (file) {
    return !!file.type.match(/^image\//)
  }

  /**
     * Creates an image based on a file or a link
     *
     * Создает изображение на основе файла или ссылки
     * @param src file or link / файл или ссылка
     */
  static createImage (src) {
    return new Promise(resolve => {
      if (src) {
        const image = new Image()
        image.onerror = () => resolve(undefined)
        image.onload = () => {
          resolve({
            image,
            height: image.naturalHeight,
            width: image.naturalWidth,
            src: this.getSRC(image, src)
          })
        };
        (async () => {
          image.src = src instanceof File ? await this.getFileResult(src) : src
        })()
      } else {
        resolve(undefined)
      }
    })
  }

  /**
     * Returns a link to the image
     *
     * Возвращает ссылку на изображение
     * @param src file or link / файл или ссылка
     */
  static getPath (src) {
    return this.createImage(src).then(item => item?.src || '')
  }

  /**
     * Applications asynchronously read the contents of files (or raw data buffers) stored on the user's computer
     *
     * Асинхронно читать содержимое файлов (или буферы данных), хранящиеся на компьютере пользователя
     * @param file the Blob or File from which to read / Blob или File которые следует прочитать
     */
  static getFileResult (file) {
    return new Promise(resolve => {
      if (this.isImage(file)) {
        const reader = new FileReader()
        reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : '')
        reader.readAsDataURL(file)
      } else {
        resolve('')
      }
    })
  }

  /**
     * Image size adaptation. Checks if the image size is larger than maxSize,
     * reduces it to maxSize
     *
     * Адаптация размера изображения. Проверяет, если размер изображения больше maxSize,
     * уменьшает его до maxSize
     * @param image image element / элемент изображения
     * @param src link to image / ссылка на изображение
     * @param maxSize maximum allowable image size / максимальный допустимый размер изображения
     * @protected
     */
  static getSRC (image, src, maxSize = exports.MAX_SIZE) {
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
}
exports.FileImage = FileImage
// # sourceMappingURL=FileImage.js.map
