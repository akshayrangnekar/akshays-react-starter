var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// Configure the paths we want to use - the source and destination
const PATHS = {
  app: path.join(__dirname, '../../app'),
  build: path.join(__dirname, '../../build'),
};

// The webpack.config.js needs to export an object that tells
// webpack how to process the files:
const commonConfig =  {
  entry: PATHS.app, // The root file of our app that should be bundled
  output: {
    path: PATHS.build,
    filename: 'bundle.js', // The output file - this is the part that generates the bundle.js
  },
  module: {
    rules: [
      {
        enforce: 'pre', // Make sure we run BEFORE transpiling
        test: /\.js$/, // Test all .js files
        exclude: /node_modules/, // Except in node_modules
        loader: "eslint-loader",
      },
      {
        exclude: /node_modules/,
        loader: 'babel-loader', // Use the babel loader
        query: {
          presets: ['react', 'es2015'], // These are the babel modules we want to use
        },
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: require('html-webpack-template'),
      appMountId: 'container', // Where we mount our React app
      title: 'My Generated HTML File'
    })
  ],
};

const developmentConfig = () => {
  const config = {
    devServer: {
      contentBase: PATHS.build, // Where the dev server should serve files from

      // If you're running on a system without file system events (e.g., if you're)
      // editing on a Mac but running on a vagrant box, uncomment the following section
      // See http://andrewhfarmer.com/webpack-watch-in-vagrant-docker/
      // watchOptions: {
      //  poll: 1000,
      // },

      // Display only errors to reduce the amount of output.
      // stats: 'errors-only',

      // overlay: true is equivalent
      overlay: {
        errors: true,
        warnings: true,
      },
      host: '0.0.0.0',
      port: 8080, // Defaults to 8080

    },

  };
  return Object.assign(
    {},
    commonConfig,
    config
  );
};

module.exports = (env) => {
  if (env === 'production') return commonConfig;
  return developmentConfig();
};
