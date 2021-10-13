var path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve('lib'),
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            },
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            react: path.resolve('./node_modules/react'),
            'react-router': path.resolve('./node_modules/react-router'),
            'react-router-dom': path.resolve('./node_modules/react-router-dom')
        }
    },
    externals: {
        "react": "commonjs react",
        "react-dom": "commonjs react-dom",
        'react-router-dom': 'commonjs react-router-dom'

    }
}