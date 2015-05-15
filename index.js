var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// returns a Compiler instance
var compiler = webpack({
    context: __dirname + '/app',
    entry: './entry',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'OSMC'
        })
    ]
});
compiler.run(function(err, stats) {});
// or
compiler.watch({ // watch options:
    aggregateTimeout: 300, // wait so long for more changes
    poll: true // use polling instead of native watchers
        // pass a number to set the polling interval
}, function(err, stats) {});
