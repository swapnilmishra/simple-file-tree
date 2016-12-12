var jsPath = 'public/javascripts/'
var path = require('path');
var webpack = require('webpack')
module.exports = {
    entry: [
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client?reload=true',
      path.join(__dirname,'./public/javascripts/index.js')
    ],
    output: {
      path: path.join(__dirname,'./public/javascripts/dist/'),
      publicPath: 'http://localhost:3000/javascripts/dist/',
      filename: 'bundle.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};
