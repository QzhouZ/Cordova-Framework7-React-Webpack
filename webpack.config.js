var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(options) {
    var config = {
        entry: [
            './www_src/app.js'
        ],
        output: {
            path: path.join(__dirname, 'www/js'),
            filename: 'bundle.js',
            publicPath: './js/'
        },
        module: {
            loaders: [{
                test: /\.jsx?$/,
                loaders: ['babel'],
                exclude: /node_modules/
            }],
            noParse: [/moment-with-locales/]
        },
        resolve: {
            extensions: ['', '.js', '.jsx', '.json', '.coffee'],
            alias: {
                lib: path.join(__dirname, "./www_src/lib"),
                view: path.join(__dirname, "./www_src/view"),
                moment: "moment/min/moment-with-locales.min.js"
            }
        }
    };

    // 开发模式
    if (options.environment === 'dev') {
        config.devtool = 'source-map';
        Array.prototype.unshift.call(
            config.entry,
            'webpack-dev-server/client?http://127.0.0.1:3000',
            'webpack/hot/only-dev-server'
        );
        config.plugins = [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin()
        ];
        config.output.publicPath = '/www/js/';
        config.module.loaders[0].loaders.unshift('react-hot');
    }
    return config;
};