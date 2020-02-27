/* eslint-disable no-undef */
module.exports = {}
const { lang } = require(__static)
lang.forEach(l => {
  const m = require(`./${l}.json`)
  module.exports[l] = m
})