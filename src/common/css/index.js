/* eslint-disable no-undef */
module.exports = {}
const { cssName } = require(__static)
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)
const makeName = (name) => `${capitalize(name)}Style`

cssName.forEach(css => {
  const m = require(`./${css}.module.css`)
  const name = makeName(css)
  module.exports[name] = m
})