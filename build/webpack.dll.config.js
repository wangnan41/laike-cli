const path = require("path");
const webpack = require("webpack");
const moment = require('moment');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const config = require('./package.json');

let vendor = ['vue','qs','axios','vue-router'];
let vendordev = ['vue/dist/vue.esm.js','qs','axios','vue-router'];

module.exports = {
    entry:{
        vendor:vendor,
        vendordev:vendordev
    },
    output:{
        path:path.join(__dirname,'/static/'),
        filename:'[name].dll.js',//vendor.dll.js 中暴露出的全局变量
        library:'[name]_library'//主要是给DllPlugin 中的name使用
    },
    plugins:[
        new CleanWebpackPlugin('static'),
        new webpack.DllPlugin({
            path:path.join(__dirname,'/static/','[name]-manifest.json'),
            name:'[name]_library',
            context:__dirname
        }),
        new webpack.BannerPlugin({
            banner:`${config.name}${config.version}${moment().format()}`
        })
    ]
}