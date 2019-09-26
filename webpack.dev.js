const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    plugins: [
        // 抽离css样式
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        })
    ]
});