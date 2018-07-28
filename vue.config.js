const path = require('path');


const addZero = function (n) {
  return Number(n) < 10 ? '0' + n : n;
};

const date = new Date();
const year = date.getFullYear();
const month = addZero(date.getMonth() + 1);
const day = addZero(date.getDate());
const hours = addZero(date.getHours());
const minutes = addZero(date.getMinutes());
const getFullDate = `${year}${month}${day}${hours}${minutes}`;

module.exports = {
  baseUrl: './',
  productionSourceMap: false,
  css: {
    extract: {
      filename: `css/[name].${getFullDate}.css`,
      chunkFilename: `css/[name].${getFullDate}.css`,
    },
  },
  configureWebpack: {
    output: {
      filename: `js/[name].${getFullDate}.js`,
      chunkFilename: `js/[name].${getFullDate}.js`,
    },
  },
  devServer: {
    port: 3888,
    open: true,
  }
}