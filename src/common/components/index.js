/* eslint-disable no-undef */
module.exports = {}
const { moduleName } = require(__static)

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)
const makeModule = (name, module=[]) => ({
  name: name,
  module: module,
})

const files = moduleName.map(m => makeModule(m))
for (const file of files) {
  const m = require(`./${file.name}`)
  module.exports[capitalize(file.name)] = m.default
  for (const c of file.module) {
    module.exports[c] = m[c]
  }
}