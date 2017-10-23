const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist/new-zealand-wars'),
    publicPath: '/new-zealand-wars',
    filename: 'app.[hash].js'
  },
    resolve: {
        modules: [path.resolve(__dirname, './src'), 'node_modules']
    },
    devServer: {
        contentBase: path.resolve(__dirname, './assets'),
        openPage: '/new-zealand-wars/'
    },
module: {
        rules: [
            {
                test: /\.md$/,
                include: [/src/],
                loader: 'markdown-loader'
            },
            {
                test: /\.scss$/,
                loader: "style-loader!css-loader!postcss-loader!sass-loader"
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                loader: 'url-loader'
            },
            {
              test: /\.yaml$/,
              loader: 'yml-loader'
            },
          {
      loader: 'babel-loader',
      include: [
        path.resolve(__dirname, "src"),
      ],
      test: /\.(js|jsx|es6)$/,
      exclude: /(node_modules|bower_components)/,
      query: {
        plugins: ['transform-runtime'],
        presets: ['env'],
      }
    }
        ]
    },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      // favicon: 'src/images/favicon.ico',
      title: 'NZH Insights'
    }),
    new CopyWebpackPlugin([
      { from: 'assets/images', to: 'images' }
    ])
  ]
};

module.exports = config;
