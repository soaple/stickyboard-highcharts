var path = require('path');

module.exports = {
    mode: 'production',
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [{
            include: [path.resolve(__dirname, 'src')],
            test: /\.jsx?$/,
            // exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    plugins: [
                        '@babel/plugin-proposal-class-properties',
                        '@babel/plugin-proposal-object-rest-spread'
                    ]
                }
            },
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    externals: {
        react: 'react',
        'prop-types': 'prop-types'
    },
    plugins: []
};
