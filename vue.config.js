const { defineConfig } = require('@vue/cli-service')
const PropertiesService = require('./service/PropertiesService')

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: new PropertiesService(['md2']).getScss()
      }
    }
  }
})
