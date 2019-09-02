const path = require('path');
const webpack = require("webpack");
const merge = require("webpack-merge");
const webpackConfigBase = require('./webpack.base.config');

const webpackConfigDev = {
    mode:'development',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: './js/[name].js'
    },
    


}
