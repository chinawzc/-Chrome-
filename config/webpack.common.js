const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
    entry:  {
        app: './src/index.js',
        background: './background/index.js',
        "content-script": './content-script/index.js'
    },
    plugins: [
        //部分代码省略
        new CleanWebpackPlugin(['dist'], { 
            root: path.resolve(__dirname, '../SmartTransExt'), 
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject:true
        }),
    ],
    output: {
        path: path.resolve(__dirname, '../SmartTransExt/dist'),
    },
    performance: {
        hints: false
    },
    devServer: {
        proxy: {
            "/apiBCE": {
                "target": "https://aip.baidubce.com",
                "changeOrigin": true,
                "pathRewrite": {"^/apiBCE": ""}
            },
            "/apiBFAN": {
                "target": "http://api.fanyi.baidu.com/api/trans/vip/",
                "changeOrigin": true,
                "pathRewrite": {"^/apiBFAN": ""}
            }
        }
    },
    module: {
        rules:[
            {
                test:/|.(js|jsx)$/,
                use:['babel-loader'],
                exclude:/node_modules/
            },
            {
                test: /\.css$/, loader: "style-loader!css-loader",
                // exclude:/node_modules/
            },
            {
                test:/\.less$/,
                use:['style-loader','css-loader?modules&localIdentName=[name]-[hash:base64:5]','less-loader'],
                exclude:/node_modules/
            },
            {
                test:/\.(png|jpg|gif|woff|svg|eot|woff2|ttf)$/,
                use:'url-loader?limit=81920',
                exclude:/node_modules/
            },
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },

        ]
    }
};