const path = require('path');
const merge = require('webpack-merge');
const commonConfig = require('./webpack-common.js');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = merge(commonConfig, {
    output: {
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        // 清理dist目录
        new CleanWebpackPlugin()
    ]
});