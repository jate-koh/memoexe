const path = require('path');

const nodeExternals = require('webpack-node-externals');
const terserPlugin = require('terser-webpack-plugin');
const tsconfigPath = require("tsconfig-paths-webpack-plugin");

const dist_path = path.resolve(__dirname, 'dist');
const src_path = path.resolve(__dirname, 'src');

const main = {
    entry: './src/index.ts',
    resolve: {
        extensions: ['.ts'], 
        plugins: [new tsconfigPath()]
    },
    output: {
        filename: 'bundle.js',
        path: dist_path
    },

    module: {
        rules: [{
            test: /\.ts?$/,
            loader: 'ts-loader',
            include: src_path,
            options: { 
                transpileOnly: true 
            },
        }]  
    },

    plugins: [],

    externals: [nodeExternals()],
    externalsPresets: { node: true },

    optimization: {
        minimize: true,
        minimizer: [ 
            new terserPlugin( { extractComments: false } ) 
        ]
    },

};

module.exports = [main]