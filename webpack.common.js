const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    module: {
        rules: [{
            test: /\.css$/,
            include: path.resolve(__dirname, "src"),// 仅加载src目录下的资源
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",// 编译后用什么loader来提取css文件
                use: "css-loader"// 指需要什么样的loader去编译文件,这里由于源文件是.css所以选择css-loader
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
            inject: false
        })
    ]
};