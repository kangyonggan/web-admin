const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    output: {
        filename: "main.[hash].js"
    },
    plugins: [
        // 清理dist目录
        new CleanWebpackPlugin(),
        // 自动根据模板index.ejs生成index.html，并在index.html中引入带有hash的js
        new HtmlWebpackPlugin({
            template: './index.ejs',
            inject: false
        })
    ]
};