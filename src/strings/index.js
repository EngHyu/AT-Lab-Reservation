const glob = require('glob')
const path = require('path')

const folder = `./${__dirname}/`
const select = '!(index)'
const format = '.json'
const local = folder + select + format

module.exports = {}
glob.sync(local).forEach(file => {
  const filePath = path.basename(file)
  const fileName = path.basename(filePath, format)
  const m = require('./' + filePath)
  module.exports[fileName] = m
})
