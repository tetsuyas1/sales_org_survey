const path = require('path');
const webpack = require("webpack");
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
          }
        ]
      }
    ]
  },
};

const vendorScript = {
  mode: 'development',
  entry: ["jquery", "popper.js", "bootstrap", "tippy.js"],
  output: {
    filename: "vendor.js",
    path: path.join(__dirname, "dist")
  },
  module: {
    rules: [{
      test: require.resolve("jquery"),
      use: [{
        loader: "expose-loader", // global に jQuery / $ を公開
        options: "jQuery"
      }, {
        loader: "expose-loader",
        options: "$"
      }]
    }]
  },
  plugins: [
    // bootstrap のコードから jQuery が直接見えるように
    // http://getbootstrap.com/docs/4.0/getting-started/webpack/#importing-javascript
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      Popper: ["popper.js", "default"]
    })
  ]
};

module.exports = [js, vendorScript]
