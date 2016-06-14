var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');

config.entry['app'].unshift(
    "webpack-dev-server/client?http://127.0.0.1:3000/", 
    "webpack/hot/only-dev-server"
);
config.output.publicPath = '/www/dist/';
config.module.loaders.unshift({
    test: /\.jsx?$/,
    loader: 'react-hot',
    exclude: /node_modules/
});
config.plugins.push(new webpack.HotModuleReplacementPlugin());
new WebpackDevServer(webpack(config), {
	publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: { colors: true }
}).listen(3000, '127.0.0.1', function (err, result) {
    if (err) {
        console.log(err);
    }
    console.log('server start');
});