const path = require('path');

module.exports = {
  entry: {
    main: './index.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|tsx?)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-react',
            '@babel/preset-typescript',
            ['@babel/preset-env', {modules: false}],
          ],
        },
      },
    ],
  },
  devServer: {
    port: 8080,
    hot: true,
    contentBase: path.join(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
    alias: {
      'react-native$': 'react-native-web',
    },
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
