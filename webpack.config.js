var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var node_dir = path.join(__dirname, './node_modules/');

// 判断是否是在当前生产环境
var isProduction = process.env.NODE_ENV === 'production';
module.exports = {
    entry: {
        app: ['./www/src/app.jsx']
    },
    output: {
        path: path.join(__dirname, './www/dist'),
        filename: 'js/bundle.js',
        publicPath: '/www/dist/',
        chunkFilename: '[name].chunk.js'
    },
    module: {
        noParse:[
            /*path.join(node_dir,'./react/dist/react.min.js'),
            path.join(node_dir,'./jquery/dist/jquery.min.js'),
            path.join(node_dir,'./react-dom/dist/react-dom.min.js')*/
        ],
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react']
            },
            exclude: node_dir
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style', 'css')
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('style', 'css!less')
        }, {
            test: /\.(png|jpe?g|gif)$/,
            loader: 'url?limit=8192&name=img/[name].[ext]'
        }, {
            //文件加载器，处理文件静态资源
            test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file?limit=10000&name=fonts/[name].[ext]'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.json', '.css', '.less'],
        alias: {
            mod: node_dir,
            libs: path.join(__dirname, "./www/libs"),
            view: path.join(__dirname, "./www/src/view")
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            React: 'react', // 使react变成全局变量
            ReactDOM: 'react-dom'
        }),
        new webpack.NoErrorsPlugin(),
        /*new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),*/
        new ExtractTextPlugin('css/[name].css')
    ],
    devtool: isProduction ? null : 'source-map'
};
