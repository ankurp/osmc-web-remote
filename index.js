var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// returns a Compiler instance
var compiler = webpack({
  context: __dirname + '/app',
  entry: './entry',
  output: {
      path: __dirname + '/dist',
      filename: 'bundle.js',
      sourceMapFilename: 'bundle.js.map'
  },
  loaders: [
    { test: /\.sass$/, loader: 'style!css!sass' },
    { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
  ],
  plugins: [new HtmlWebpackPlugin({
    title: 'OSMC'
  }), new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
  })]
});

compiler.run(function(err, stats) {

});
// or
compiler.watch({ // watch options:
    aggregateTimeout: 300, // wait so long for more changes
    poll: true // use polling instead of native watchers
    // pass a number to set the polling interval
}, function(err, stats) {

});