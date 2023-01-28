const path = require('path');

const nodeExternals = require('webpack-node-externals');
const terserPlugin = require('terser-webpack-plugin');
const tsconfigPath = require('tsconfig-paths-webpack-plugin');
const eslint = require('eslint-webpack-plugin');
//const nodemon = require('nodemon-webpack-plugin');

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

    plugins: [
        // new nodemon({
        //     script: './dist/bundle.js',
        //     watch: path.resolve('./dist'),
        //     ignore: ['**/*.test.ts", "**/*.spec.ts", "node_modules'],
        //     ext: 'js,ts',
        // }),
        new eslint({
            extensions: ['ts'],
            exclude: ['node_modules'],
            failOnError: false
        })
    ],

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