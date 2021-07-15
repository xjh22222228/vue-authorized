const fs = require('fs')
const path = require('path')

function resolve(_path) {
  return path.join(__dirname, '..', _path)
}

fs.unlinkSync(resolve('./dist/demo.html'))
fs.copyFileSync(resolve('package.json'), resolve('./dist/package.json'))
fs.copyFileSync(resolve('yarn.lock'), resolve('./dist/yarn.lock'))
fs.copyFileSync(resolve('LICENSE'), resolve('./dist/LICENSE'))
