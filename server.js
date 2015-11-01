var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.dev.config.js');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
}).listen(3000, '127.0.0.1', function (err, result) {
    if (err) {
        console.log(err);
    }
    console.log('server start');
});