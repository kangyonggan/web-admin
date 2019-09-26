const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    module: {
        rules: [{
            test: /\.css$/,
            include: path.resolve(__dirname, "src"),
            use: [
                'style-loader',
                'css-loader'
            ]
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            include: path.resolve(__dirname, "src"),
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