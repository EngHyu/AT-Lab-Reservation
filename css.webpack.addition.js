module.exports = function(config) {
  const globalRule = config.module.rules.find(rule => rule.test.toString().match(/css/))
  globalRule.exclude = /\.module\.css$/

  const localRule = {
    test: /\.css$/,
    use: [
      'css-hot-loader',
      './node_modules/mini-css-extract-plugin/dist/loader.js',
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          modules: true
        }
      }
    ],
    include: /\.module\.css$/,
    exclude: /\.global\.css$/
  }
  
  config.module.rules.push(localRule)
  return config
}