const path = require('path');

const mainPath = path.resolve(__dirname, 'js', 'index.tsx');
const Dotenv = require('dotenv-webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const extensions = ['.tsx', '.jsx', '.js', '.ts', '.json'];

module.exports = {
  entry: mainPath,
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: 'http://localhost:9091/assets/',
    filename: 'bundle.js',
    hashFunction: 'xxhash64',
  },
  mode: 'development',
  devtool: 'eval-source-map',
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
            loader: 'style-loader',
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
    new Dotenv(),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: './js/**/*.{ts,tsx,js,jsx}',
      },
    }),
  ],
};
