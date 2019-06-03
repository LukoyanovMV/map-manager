const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


const extractLess = new ExtractTextPlugin({
    filename: "[name]/style.css"
});


const DIST_PATH = path.resolve(__dirname, 'dist');
const SRC_PATH = path.resolve(__dirname, 'src');
const DEV_PATH = path.resolve(__dirname, 'debug');

const DEV_HOST = 'lmv.orbismap.com';


const DEV_SERVER_PORT = '4000';


config = {

    entry: {
        users: path.join(SRC_PATH, 'modules/users/index.js'),
        containerEditor: path.join(SRC_PATH, 'modules/containerEditor/index.js'),
        core: [
            path.join(SRC_PATH, 'index.js'),
            path.join(SRC_PATH, 'scenes/auth/index.jsx')
        ],
        commons: [
            path.join(SRC_PATH, 'components/auth-form/index.jsx')
        ],
        vendor:[
            'react',
            'react-dom',
            'redux',
            'react-redux',
            'redux-thunk'
        ]
    },

    output: {
        filename: '[name]/index.js',
        path: DIST_PATH,
        publicPath: 'http://localhost:' + DEV_SERVER_PORT + '/'
    },

    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /(node_modules)/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react', 'stage-0'],
                    plugins: ['syntax-dynamic-import']
                }
            }]
        }, {
            test: /\.(less|css)$/,
            use: extractLess.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "less-loader"
                }],
                // use style-loader in development
                fallback: "style-loader"
            })
        }]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['core', 'commons', 'vendor'], // Specify the common bundle's name.
        }),
        extractLess
    ],

    resolve: {
        extensions: [".js", ".json", ".jsx"],
        modules: [
            path.resolve(__dirname, SRC_PATH),
            'node_modules'
        ]
    }
};

if (process.env.NODE_ENV === 'development') {
    console.log('development');
    config.devServer = {
        port: DEV_SERVER_PORT,
        proxy: {
            "/login": {
                "target": {
                    "host": DEV_HOST,
                    "protocol": 'http:',
                    "port": 80
                },
                ignorePath: true,
                changeOrigin: true,
                secure: false
            }
        }
    }
} else if (process.env.NODE_ENV === 'production') {
    console.log('production');
    config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = config;