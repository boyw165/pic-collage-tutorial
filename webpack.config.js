var path = require('path');

var MODULE_DIR = path.join(__dirname, '/node_modules');
var DEPS = [
  'jquery/dist/jquery.min.js',
  'react/dist/react.min.js',
  'react-dom/dist/react-dom.min.js',
  // 'react-router/dist/react-router.min.js',
  'react-slick/dist/react-slick.js'
];

var config = {
  // context: path.join(__dirname, '/src'),
  entry: path.join(__dirname, '/src/client/main.js'),
  output: {
    path: path.join(__dirname, '/dist/client/scripts'),
    filename: "bundle.js"
  },
  resolve: {
    alias: {
      'TweenLite': path.resolve(MODULE_DIR, 'gsap/src/minified/TweenLite.min.js'),
      'TweenMax': path.resolve(MODULE_DIR, 'gsap/src/minified/TweenMax.min.js'),
      'TimelineLite': path.resolve(MODULE_DIR, 'gsap/src/minified/TimelineLite.min.js'),
      'TimelineMax': path.resolve(MODULE_DIR, 'gsap/src/minified/TimelineMax.min.js')
    }
  },
  module: {
    noParse: [],
    loaders: [
      {
        test: /\.jsx?$/,
        // exclude: /(node_modules|bower_components)/,
        // loader: 'babel?optional[]=runtime'
        loader: 'babel-loader'
      }, {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  }
};

// Run throught DEPS and extract the first part of the path, as that is what you
// use to reuire the actual node modules in your code. Then use the complete
// path to point to the correct file and make sure webpack does not try to parse
// it.
DEPS.forEach(function(dep) {
  var depPath = path.resolve(MODULE_DIR, dep);
  var modName = dep.split(path.sep)[0];

  config.resolve.alias[modName] = depPath;
  // config.module.noParse.push(depPath);
});

module.exports = config;
