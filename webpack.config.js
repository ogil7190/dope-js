/**
 * Basic requirements go below.
 */

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const {
  alias
} = require('./webpack.config.extra');


/*=========== WEBPACK HELPER FUNCTIONS ===========*/

// Copy static assets, webpack plugin `src => dist` mapper
const copyWebpackPluginMap = (srcDir, destDir) => {
  return {
    from: path.resolve(__dirname, srcDir),
    to: path.resolve(__dirname, 'dist', destDir),
    cache: false
  };
};


/**
 * Webpack configuration goes below.
 */

var configuration = {
  context: __dirname,

  entry: [
    "./src/js/index",
    './src/sass/style.scss'
  ],

  output: {
    path: path.join(__dirname, "/dist"),
    filename: "[name].js"
  },
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCSSExtractPlugin.loader,
          'css-loader?-url', // -url: do not parse url() imports as relative urls will fail
          'postcss-loader',
          {
            loader: 'sass-loader'
          }
        ]
      },
    ]
  },

  // resolve files configuration
  resolve: {
    // module alias
    alias: alias
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),

    // to `as-is` copy files/folders
    // use `copyWebpackPluginMap( dirPath, folderNameInDist )` to create distribution map
    new CopyWebpackPlugin([
      copyWebpackPluginMap('src/assets', 'assets')
    ].filter(Boolean)),

    new MiniCSSExtractPlugin({
      filename: 'css/style.css'
    }),
  ],

  // generate source map
  devtool: ('cheap-module-eval-source-map')
};

module.exports = configuration;