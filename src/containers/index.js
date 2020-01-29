const glob = require('glob')
const path = require('path')

const folder = './src/containers/'
const select = '!(index)'
const format = '.js'
const local = folder + select + format

module.exports = {}
glob.sync(local).forEach(file => {
  const name = path.basename(file, format)
  const m = require('./' + name).default
  if (typeof(m) === "function") {
    module.exports[m.name] = m
    return
  }
  if (typeof(m) === "object") {
    module.exports = {
      ...module.exports,
      ...m,
    }
    return
  }
})
