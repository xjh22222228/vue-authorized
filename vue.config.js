const moment = require('moment');
const path = require('path');

const buildDate = moment().format('YYYYMMDDhhmmss');

module.exports = {
  publicPath: './',
  productionSourceMap: false,
  css: {
    extract: {
      filename: `css/[name].${buildDate}.css`,
      chunkFilename: `css/[name].${buildDate}.css`,
    },
  },
  configureWebpack: {
    output: {
      filename: `js/[name].${buildDate}.js`,
      chunkFilename: `js/[name].${buildDate}.js`,
    },
  },
  devServer: {
    port: 3888,
    open: true,
  },
  chainWebpack: config => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: path.resolve(__dirname, './src/assets/styles/variables.scss'),
        })
        .end()
    })
  }
}