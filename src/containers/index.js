const glob = require('glob')
const path = require('path')

const folder = `./${__dirname}/`
const select = '!(index)'
const format = '.js'
const local = folder + select + format

module.exports = {}
for (const file of glob.sync(local)) {
  const fileName = path.basename(file)
  const m = require('./' + fileName)
  for (const ele of Object.values(m)) {
    module.exports[ele.name] = ele
  }
}