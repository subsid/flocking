const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: './dist',
    open: false
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
         test: /\.(png|svg|jpg|gif)$/,
         use: [ 'file-loader' ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {from: './src/assets', to: 'assets'},
      {from: './src/lib', to: 'lib'}
    ])
  ]
};
