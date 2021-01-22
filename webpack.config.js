const path = require('path');

module.exports = {
  entry: {
    main: ['./index.js'],
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|tsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            configFile: false,
            presets: [
              '@babel/preset-react',
              '@babel/preset-typescript',
              ['@babel/preset-env', {modules: false}],
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              // [
              //   'module-resolver',
              //   {
              //     alias: {
              //       'react-native-gesture-handler': '../',
              //       'react-native$': 'react-native-web',
              //     },
              //   },
              // ],
            ],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader?limit=1000000',
          },
        ],
      },
    ],
  },
  devServer: {
    port: 8080,
    hot: true,
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
    alias: {
      'react-native-gesture-handler': '../',
      'react-native$': 'react-native-web',
    },
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
