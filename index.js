var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var compiler = webpack({
    context: __dirname + '/app',
    entry: [
        './entry'
    ],
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /(app\/js\/vendor|node_modules|bower_components)/,
            loader: 'babel'
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'OSMC'
        })
    ]
});
compiler.run(function(err, stats) {});
compiler.watch({ // watch options:
    aggregateTimeout: 300, // wait so long for more changes
    poll: true // use polling instead of native watchers
        // pass a number to set the polling interval
}, function(err, stats) {});

var express = require('express'),
app = express(),
port = process.env.PORT || 4000;
app.use(express.static(__dirname + '/dist'));
app.listen(port);
console.log('Server running at http://127.0.0.1:4000/');
