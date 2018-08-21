var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, 'index.jsx'),
    output: {
        path: path.join(__dirname, '..', 'build'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-3']
                }
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: path.join(__dirname, 'schema.html'),
        filename: path.join(__dirname, '..', 'build', 'index.html'),
        inject: 'body'
    })]
}