const Webpack = require('webpack');
const path = require('path');

const buildPath = path.resolve(__dirname, 'dist/resources');
const mainPath = path.resolve(__dirname, 'js', 'index.tsx');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const extensions = ['.tsx', '.jsx', '.js', '.ts', '.json'];

const config = function () {
  return {
    devtool: 'source-map',
    entry: mainPath,
    output: {
      path: buildPath,
      filename: 'bundle-prod.js',
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
