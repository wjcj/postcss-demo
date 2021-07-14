const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssNormalize = require('postcss-normalize');

process.env.NODE_ENV = 'development'

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.js$/,
            loader: require.resolve('babel-loader'),
          },
          {
            test: /\.css$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  postcssOptions: {
                    plugins: [
                      require('postcss-flexbugs-fixes'),
                      [
                        require('postcss-preset-env'),
                        {
                          autoprefixer: {
                            flexbox: 'no-2009',
                          },
                          stage: 3, 
                        },
                      ],
                      postcssNormalize(),
                    ],
                  },
                },
              },
            ],
          },
          {
            loader: require.resolve('file-loader'),
            exclude: [/\.(js|jsx)$/, /\.html$/, /\.json$/],
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].chunk.css',
    }),
  ],
};
