const path = require('path');

const js = {
  mode: 'development',
  entry: {
    index: path.resolve(__dirname, 'src', 'index.js'),
    q: path.resolve(__dirname, 'src', 'q.js'),
    result: path.resolve(__dirname, 'src', 'result.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
              ]
            }
          }
        ]
      }
    ]
  }
};

module.exports = js;
