const path = require('path');
const merge = require('webpack-merge');
const commonConfig = require('./webpack-common.js');

module.exports = merge(commonConfig, {
    output: {
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    }
});