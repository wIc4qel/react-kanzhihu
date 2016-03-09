var webpack = require('webpack');


module.exports = {
  entry : ['./src/index.js'],
  module : {
    loaders : [{
      test : /\.js?$/,
      loader : 'react-hot!babel?presets[]=react',
      exclude : /node_modules/
    },{
      test : /\.json$/,
      loader : 'json-loader'
    }]
  },
  resolve : {
    extensions : ['','.js','.json']
  },
  output : {
    path : 'dist',
    publicPath : '/',
    filename : 'bundle.js'
  },

  devServer :{
    contentBase : './dist',
    hot : true
  },
  plugins : [
    new webpack.HotModuleReplacementPlugin()
  ]
};
