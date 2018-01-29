import path from 'path';
import autoprefixer from 'autoprefixer';
import webpack from 'webpack';
import aliasWebpackPlugin from 'alias-webpack-plugin';

const base = {
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        use: 'source-map-loader'
      },
      {
        test: /\.js$/,
        use: [
          'babel-loader',
          'locale-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.woff|\.woff2|.eot|\.ttf/,
        use: 'url-loader?limit=15000&publicPath=./&name=fonts/[name]_[hash].[ext]',
      },
      {
        test: /\.svg/,
        exclude: /node_modules|font/,
        use: [
          'babel-loader',
          'react-svg-loader'
        ],
      },
      {
        test: /\.png|\.jpg|\.gif|\.svg/,
        use: 'url-loader?limit=20000&publicPath=./&name=images/[name]_[hash].[ext]',
        exclude: [/assets(\/|\\)images(\/|\\).+\.svg/, /dev-server(\/|\\).+\.svg/]
      },
      {
        test: /\.sass|\.scss/,
        use: [
          'style-loader',
          'css-loader?modules&localIdentName=[path]_[name]_[local]_[hash:base64:5]',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                autoprefixer
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [__dirname],
              outputStyle: 'expanded'
            }
          }
        ],
      },
      {
        test: /\.ogg$/,
        use: 'file-loader?publicPath=./&name=audio/[name]_[hash].[ext]',
      },
    ],
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
  resolve: {
    alias: {
      ...aliasWebpackPlugin(),
    },
  },
};


const config = [{
  ...base,
  entry: {
    index: [path.resolve(__dirname, './index')],
    proxy: [path.resolve(__dirname, './proxy')],
    redirect: [path.resolve(__dirname, './redirect')],
  },
  output: {
    path: path.resolve(__dirname, './'),
    filename: '[name].js',
    publicPath: '/',
  },
}];

config.port = '8191';

export default config;
