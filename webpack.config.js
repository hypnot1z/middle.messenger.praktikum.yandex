const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: './index.ts',
  mode: 'development',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
            },
          },
          'scss-loader',
        ],
        include: /\.module\.scss$/i,
      },
      {
        test: /\.scss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /\.module\.scss$/i,
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        exclude: /(node_modules)/,
      },
      {
        test: /\.(ts|js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: { configFile: path.resolve(__dirname, 'tsconfig.json') },
          },
        ],
      },
      { test: /\.(png|jpe?g|svg)$/i, use: [{ loader: 'file-loader' }] },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new CleanWebpackPlugin(),
  ],

  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      handlebars: 'handlebars/dist/handlebars.min.js',
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3000,
    historyApiFallback: true,
    open: true,
    compress: true,
  },
}
