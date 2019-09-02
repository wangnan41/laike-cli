const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const moment = require('moment');
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const chalk = require('chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin')


module.exports =  {
    entry: {
        index: '../src/entry/index.js',
        detail: '../src/entry/detail.js'
    },
    output:{
        path: path.resolve(__dirname, '../dist/'),
        filename:'[name].[hash].js'
    },
    stats:{
        entrypoints:false,
        children:false
    },
    resolve: {
        extensions: ['.js', '.vue', '.json']
    },
    rules:[
        {
            test:/\.css$/,
            use: [
                isDev?'style-loader': MinicssExtractPlugin.loader,
                "css-loader",
                "postcss-loader"
            ]
        },
        {
            test: /\.scss$/,
            use: [
                isDev?'style-loader': MinicssExtractPlugin.loader,
                "css-loader",
                "postcss-loader",
                "sass-loader"
            ],
        
        },
        {
            test: /\.vue$/,
            use: [
                {
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            sass: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', 'postcss-loader']
                        } 
                    },
                    postcss: [autoprefixer()]
                }
            ]
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        }, 
        {
            test: /\.(png|jpg|gif|webp)$/,
            loader: 'url-loader',
            options: {
                limit: 3000,
                name: 'img/[name].[ext]',
            }
        },
    ],
    plugins: [
        new CleanWebpackPlugin(), 
        new webpack.BannerPlugin({
            banner: `laike-cli ${moment().format()} (c) 2019-2020 JD Released under the MIT License.`
        }),
        new VueLoaderPlugin(),
        new MinicssExtractPlugin({
            filename: 'css/[name].css',
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css\.*(?!.*map)$/g,
            cssProcessorOptions: {
                discardComments: { removeAll: true },
                safe: true,
                autoprefixer: false,
            },

        }),
        new ProgressBarPlugin({
            format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
        })
    ],
}