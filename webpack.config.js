const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const mode = isProduction ? 'production' : 'development';

  return {
    mode: mode,
    entry: {
      admin: './src/admin/index.js',
      public: './src/public/index.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? 'js/[name].js' : 'js/[name].js', 
      publicPath: mode === 'development' || env.target ? '/' : './',
      globalObject: 'this',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        '@components': path.resolve(__dirname, 'src/shared/components/'),
        'react': path.resolve(__dirname, 'node_modules/react'),
        'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { modules: false }],
                '@babel/preset-react',
              ],
              plugins: ['@babel/plugin-transform-runtime'],
            },
          },
        },
        {
          test: /\.(scss|css)$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                warnRuleAsWarning: false,
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/[name].[ext]',
          },
        },
      ],
    },
    plugins: [
      // Only use CleanWebpackPlugin in production
      ...(isProduction ? [new CleanWebpackPlugin()] : []),
      new MiniCssExtractPlugin({
        filename: isProduction ? 'css/[name].css' : 'css/[name].css',
      }),
      new HtmlWebpackPlugin({
        template: './src/admin/index.html',
        filename: 'admin.html',
        chunks: ['runtime', 'vendors', 'admin'],
        inject: 'body',
        scriptLoading: 'defer',
        minify: isProduction,
      }),
      new HtmlWebpackPlugin({
        template: './src/public/index.html',
        filename: 'public.html',
        chunks: ['runtime', 'vendors', 'public'],
        inject: 'body',
        scriptLoading: 'defer',
        minify: isProduction,
      }),
      new HtmlWebpackPlugin({
        template: './src/admin/wp.html',
        filename: 'admin-wp.html',
        chunks: [],
        inject: false,
        minify: isProduction,
      }),
      new HtmlWebpackPlugin({
        template: './src/public/wp.html',
        filename: 'public-wp.html',
        chunks: [],
        inject: false,
        minify: isProduction,
      }),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      port: env.target === 'admin' ? 3001 : 3000,
      hot: true,
      open: true,
      historyApiFallback: {
        index: `/${env.target}.html`,
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      // Write files to disk in development
      devMiddleware: {
        writeToDisk: true, // This ensures files are written to the dist folder
      },
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
            name: 'vendors',
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
      runtimeChunk: {
        name: 'runtime',
      },
    },
    performance: {
      hints: isProduction ? 'warning' : false,
      maxAssetSize: 500000,
      maxEntrypointSize: 500000,
    },
  };
};