var path = require('path');
var webpack = require('webpack');
 
module.exports = {
  entry: './main.js',
  output: { path: __dirname + '/static', filename: '/bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  node: {
    net: "empty",
    tls: "empty",
    fs: "empty"
  }
};
