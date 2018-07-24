const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/client.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js']
    },
    output: {
        filename: 'static/js/bundle.js',
        path: path.resolve(__dirname, 'dist/public')
    }
};