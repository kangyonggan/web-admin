const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(common, {
    output: {
        filename: '[name].[hash].js'
    },
    plugins: [
        // 清理dist目录
        new CleanWebpackPlugin(),
        // 清除未依赖的代码并压缩
        new UglifyJSPlugin(),
        // 抽离css样式
        new ExtractTextPlugin({
            filename: '[name].[hash].css',
            allChunks: true
        })
    ]
});