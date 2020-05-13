const webpack = require("webpack");

console.log("webpack is ran");

module.exports = {
    output: {
        path: path.resolve(__dirname, 'public/src'),
        publicPath: '/',
        filename: 'bundle.js'
      }
}