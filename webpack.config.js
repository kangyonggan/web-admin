const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    mode: "development",
    devtool: 'inline-source-map',
    entry: {
        app: './src/index.js',
        second: './src/second.js'
    },
    output: {
        // filename: '[name].bundle.js',
        // chunkFilename: '[name].bundle.js', // Dynamic Imports【动态导入】
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
            use: ['style-loader', 'css-loader']
            // 把css从js中分离出来
            // use: ExtractTextPlugin.extract({
            //     fallback: "style-loader",// 编译后用什么loader来提取css文件
            //     use: "css-loader"// 指需要什么样的loader去编译文件,这里由于源文件是.css所以选择css-loader
            // })
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
            inject: false
        }),
        // 分离css样式
        // new ExtractTextPlugin({
        //     filename: '[name].css',
        //     allChunks: true
        // }),
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