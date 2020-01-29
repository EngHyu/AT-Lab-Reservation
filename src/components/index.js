const glob = require('glob')
const path = require('path')

const folder = './src/components/'
const select = '!(index)'
const format = '.js'
const local = folder + select + format

module.exports = {}
glob.sync(local).forEach(file => {
  const name = path.basename(file, format)
  const m = require('./' + name).default
  module.exports[m.name] = m
})
