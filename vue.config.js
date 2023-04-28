const { defineConfig } = require('@vue/cli-service')
const PropertiesService = require('./service/PropertiesService')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    console.log('__dirname', path.resolve(__dirname, 'ui-loader'))
    config.module
      .rule('vue')
      .use('ui-loader')
      .loader(path.resolve(__dirname, 'ui-loader'))
      .before('vue-loader')
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: new PropertiesService(['md2']).getScss()
      }
    }
  }
})
