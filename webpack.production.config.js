const Webpack = require('webpack');
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const extensions = ['.tsx', '.jsx', '.js', '.ts', '.json'];

const config = function () {
  return {
    devtool: 'source-map',
    entry: './js/index.tsx',
    output: {
      path: path.resolve(__dirname, './dist'),
      publicPath: '/syk/dialogmotearbeidsgiver/static/',
      filename: 'bundle-prod.js',
      clean: true,
    },
    mode: 'production',
    resolve: {
      alias: {
        react: path.join(__dirname, 'node_modules', 'react'),
      },
      plugins: [
        new TsconfigPathsPlugin({
          extensions,
        }),
      ],
      extensions,
    },
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [['postcss-preset-env']],
                },
              },
            },
            {
              loader: 'less-loader',
              options: {
                globalVars: {
                  nodeModulesPath: '~',
                  coreModulePath: '~',
                },
              },
            },
          ],
        },
        {
          test: /\.(js|ts|tsx)$/,
          use: { loader: 'babel-loader' },
          exclude: /node_modules/,
        },
        {
          test: /\.(vtt)$/,
          type: 'asset/inline',
        },
        {
          test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico|mp4)$/,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'public/index.html',
        hash: true,
      }),
      new MiniCssExtractPlugin({
        filename: 'styles.css',
      }),
      new Webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
      }),
      new Dotenv(),
    ],
  };
};

module.exports = config;
