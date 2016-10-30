module.exports = {
  entry: './angular/index.main.js',
  output: {
    filename: 'app.js'
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel', 
      query: {
        presets: ['es2015'],
        cacheDirectory: true
      }
    }]
  }
}
