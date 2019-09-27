const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
    mode: "development",
    devtool: 'inline-source-map',
    entry: {
        index: './src/index.js',
        second: './src/second.js'
    },
    output: {
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [{
            test: /\.css$/,
            include: path.resolve(__dirname, "src"),// 仅加载src目录下的资源
            use: ExtractTextWebpackPlugin.extract({
                use: ['css-loader'],
                fallback: 'style-loader'
            })
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            include: path.resolve(__dirname, "src"),// 仅加载src目录下的资源
            loader: 'file-loader'
        }]
    },
    plugins: [
        // 自动根据模板index.ejs生成index.html，并在index.html中引入带有hash的js
        new HtmlWebpackPlugin({
            template: './index.ejs',
            chunks: ['index', 'vendors', 'runtime'],
            inject: false
        }),
        new HtmlWebpackPlugin({
            template: './second.ejs',
            filename: "second.html",
            chunks: ['second', 'vendors', 'runtime'],
            inject: false
        }),
        // 把全部入口js中css全部提取到一个样式文件中
        new ExtractTextWebpackPlugin({
            filename: 'style.[hash].css'
        }),
        // 清理dist目录
        new CleanWebpackPlugin(),
        // 清除未依赖的代码并压缩
        // new UglifyJSPlugin()
    ],
    optimization: {
        moduleIds: 'hashed',
        runtimeChunk: 'single', // Extracting Boilerplate【提取样版】
        // // Prevent Duplication【防止重复】：抽取多入口文件中的公共模块
        splitChunks: {
            // 抽取所有入口
            chunks: "all",
            cacheGroups: {
                vendor: {
                    // 只提取第三方依赖，因为第三方依赖时不经常改变的，项目代码虽然有公共模块，但是经常会改变，不适合抽取
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    }
};