const webpack = require('webpack');
const path = require('path');
const config = require('./package.json');
const MinicssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const htmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const moment = require('moment');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = (env, argv) => {

    let webpackConfig = {
        entry: {
            index: './src/entry/index.js',
            detail: './src/entry/detail.js',
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/',
            filename: 'js/[name].js',
            chunkFilename: 'js/[name].js'
        },
        stats: {
            entrypoints: false,
            children: false
        },
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                '@': path.resolve('src')
            }
        },

        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        argv.mode === 'development' ? 'style-loader' : MinicssExtractPlugin.loader,
                        "css-loader",
                        "postcss-loader"
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        argv.mode === 'development' ? 'style-loader' : MinicssExtractPlugin.loader,
                        "css-loader",
                        "postcss-loader",
                        "sass-loader"

                    ],

                },
                {
                    test: /\.(png|jpg|gif|webp|woff|eot|ttf)$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            name: 'img/[name].[ext]',
                            limit: 2000
                        }
                    },

                },
                {
                    test: /\.svg$/,
                    loader: 'svg-sprite-loader',
                },
                {
                    test: /\.vue$/,
                    use: [
                        {
                            loader: 'vue-loader',
                            options: {
                                loaders: {
                                    scss: [
                                        argv.mode === 'development' ? 'vue-style-loader' : MinicssExtractPlugin.loader,
                                        'css-loader',
                                        'sass-loader'
                                    ]
                                },
                                postcss: [autoprefixer()]
                            }
                        }
                    ]
                },
                {
                    test: /\.js$/,
                    use: 'babel-loader',
                    exclude: /jssdk.min.js/,
                },
                { 
                    test: /\.html$/, 
                    loader: 'html-loader' 
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin('dist'),
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
            new HtmlWebpackPlugin({
                template: './src/template/index.html',
                filename: 'index.html',
                inject: 'body',
                chunks: ['index'],
                chunksSortMode: 'none'
            }),
            new HtmlWebpackPlugin({
                template: './src/template/detail.html',
                filename: 'detail.html',
                inject: 'body',
                chunks: ['detail'],
                chunksSortMode: 'none'
            })
        ],
    }

    if (argv.mode === 'production') {

        webpackConfig.plugins = (webpackConfig.plugins || []).concat([
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./static/vendor-manifest.json')
            }),
            new htmlWebpackIncludeAssetsPlugin({
                assets: ['lib/vendor.dll.js'],
                publicPath: config.publicPath,
                append: false
            }),
            //new BundleAnalyzerPlugin(),
            new CopyWebpackPlugin([
                { from: path.join(__dirname, "./static/vendor.dll.js"), to: path.join(__dirname, "./dist/lib/vendor.dll.js") }
            ]),
            new webpack.BannerPlugin({
                banner: `${config.name} ${config.version} ${moment().format()}`
            })
        ]);
    } else {
        webpackConfig.plugins = (webpackConfig.plugins || []).concat([
            new HtmlWebpackPlugin({
                template: './src/template/index.html',
                filename: path.resolve(__dirname, 'dist/index.html'),
                inject: 'body',
                chunks: ['index'],
                chunksSortMode: 'none'
            }),
            new HtmlWebpackPlugin({
                template: './src/template/detail.html',
                filename: path.resolve(__dirname, 'dist/detail.html'),
                inject: 'body',
                chunks: ['detail'],
                chunksSortMode: 'none'
            }),
            
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./static/vendordev-manifest.json')
            }),
            new AddAssetHtmlPlugin({
                filepath: require.resolve('./static/vendordev.dll.js'),
                includeSourcemap: false
            }),

        ]);
        
        webpackConfig.output.publicPath = '/';
        webpackConfig.devtool = '#cheap-module-eval-source-map';
        webpackConfig.devServer = {
            contentBase: path.resolve(__dirname, 'dist'),
            //host:'192.168.191.2',
            //port:8080,
            //https: true,
            // writeToDisk: true,
            compress: true,
            disableHostCheck: true,
            //historyApiFallback: true
        }
    }

    return webpackConfig;

}

