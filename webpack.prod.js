const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
    output: {
        filename: 'main.[hash].js'
    },
    plugins: [
        // 清理dist目录
        new CleanWebpackPlugin(),
        new UglifyJSPlugin()
    ]
});