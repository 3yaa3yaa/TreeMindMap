
var path = require('path');
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    }
                }
            },
            {
                test: /\.css/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            url: false
                        },
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                include: path.resolve(__dirname, 'src'),
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                    },
                },
            },
        ]
    },
    externals: {
        'react': 'commonjs react'
    }
};